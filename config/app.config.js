require('dotenv').config();

module.exports = {
    APP_PORT: process.env.APP_PORT,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    FONT_AWESOME_URL: process.env.FONT_AWESOME_URL
};