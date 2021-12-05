const Conversation = require('../../dataBase/Conversation');

module.exports = {
    getConversations: () => Conversation.find(),

    createConversation: async (socketData) => {
        console.log('___________________');
        console.log(socketData);
        console.log('___________________');

        await Conversation.create({title: socketData.title, members: [socketData.user_id]});
    }
};
