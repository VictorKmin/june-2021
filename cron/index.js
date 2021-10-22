const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');

module.exports = () => {
    cron.schedule('*/10 * * * * *', () => {
        console.log('Cron started at', new Date().toISOString());
        removeOldTokens();
        console.log('Cron finished at', new Date().toISOString());
    });
};
