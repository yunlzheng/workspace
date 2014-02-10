'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/fullstack-dev'
  },
  github: {
    callbackURL: 'http://127.0.0.1:9000/auth/github/callback',
    clientID: '3403b89a3bd801a0beda',
    clientSecret: '9bda1a15e968126782e6f2a66a2868356b464dd8',
  },
  google: {
    clientID: '627446868482-ada9bth09euo3og4ec59rc5sii9krnat.apps.googleusercontent.com',
    clientSecret: 'pU_n4s2NGbPG-bQkd9FvWS1b',
    callbackURL: 'http://127.0.0.1:9000/auth/google/callback'
  },
  pusher: {
    id: '64241',
    key: '73234776bf04bcb48adc',
    secret: 'e5e38e07492ac274f75a'
  }
};