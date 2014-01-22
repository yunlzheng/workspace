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
    clientID: '148035483281.apps.googleusercontent.com',
    clientSecret: 'IickLhTPMcaBHRyk-mAOwtHY',
    callbackURL: 'http://127.0.0.1:9000/auth/google/callback'
  }
};