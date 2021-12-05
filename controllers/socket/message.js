const Message = require('../../dataBase/Message');

module.exports = {
    getMessageList: (conversationId) => Message.find({ conversationId }),
};
