const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hirehack')
    .then(() => console.log('Successfully connected to the DB'))
    .catch((err) => console.error('Error connecting to the DB', err))

process.on('SIGINT', () => {
    mongoose.connection
        .close()
        .then(() => console.log('Successfully disconnected from the DB!'))
        .catch((err) => console.error('Error disconnecting from the DB', err))
        .finally(() => process.exit());
})