require('dotenv').config();
module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
    ],
    setupFiles: ['dotenv/config'],

};