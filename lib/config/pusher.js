'use strict';

var Pusher = require('pusher'),
    config = require('./config');

var pusher = new Pusher({
        appId: config.pusher.id,
        key: config.pusher.key,
        secret: config.pusher.secret
});

pusher.trigger('test_channel', 'my_event', {
  "message": "start application"
});

exports.pusher = pusher;
