const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const socketIo = require('socket.io');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const { ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT, NODE_ENV } = require('./configs/config');
// const startCron = require('./cron');
const ErrorHandler = require('./errors/ErrorHandler');
const checkDefaultData = require('./util/default-data.util');
const swaggerJson = require('./docs/swagger.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' }
});

const conversationController = require('./controllers/socket/conversation');
const messageController = require('./controllers/socket/message');

// // Middleware runs only on socket connection
// io.use((socket, next) => {
//     const { handshake: { query } } = socket;
//     if (!query.user_id || query.user_id === 'null') {
//         console.log('ERROR');
//         next(new Error('Not registerd'));
//         return;
//     }
//
//     next();
//     console.log('90909090______________________________');
//     console.log(socket);
//     console.log('90909090______________________________');
// });

io.on('connection', (socket) => {
    const { id, handshake } = socket;

    console.log(id, 'socket ID');
    console.log(handshake.query.token, 'TOKEN');
    console.log(handshake.query.user_id, 'USER ID');
    const extraData = { token: handshake.query.token, user_id: handshake.query.user_id, socketId: id };

    socket.on('getChatList', async () => {
        const conversations = await conversationController.getConversations();

        // socket.to(id).emit('sendChatList', conversations);
        //
        socket.emit('sendChatList', conversations);
    });

    socket.on('createChat', async (socketData) => {
        await conversationController.createConversation({ ...socketData, ...extraData });
        const conversations = await conversationController.getConversations();

        io.sockets.emit('sendChatList', conversations);
    });

    socket.on('joinChat', async (socketData) => {
        socket.join(socketData.roomId);

        const messages = await messageController.getMessageList(socketData.roomId);

        // https://socket.io/docs/v4/broadcasting-events/

        // SEND TO ALL ROOM MEMBERS. EVEN TO EMITER
        // io.sockets.to(socketData.roomId).emit('newUserJoin', 'New user join. ');

        // broadcast to all room members but not to sender
        socket.broadcast.to(socketData.roomId).emit('newUserJoin', 'New user join. ');

        // Send event for emiter
        socket.emit('sendMessageList', messages);
    });
});

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo connected successfully');
});

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { authRouter, userRouter } = require('./routes');

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    checkDefaultData();
    // startCron();
});


function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }

    return callback(null, true);
}
