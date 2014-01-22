'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/fullstack-dev'
  },
  github: {
    callback_url: 'http://127.0.0.1:9000/auth/github/callback',
    client_id: '3403b89a3bd801a0beda',
    client_secret: '9bda1a15e968126782e6f2a66a2868356b464dd8',
  }
};