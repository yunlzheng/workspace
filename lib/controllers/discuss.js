'use strict';

var mongoose = require('mongoose'),
    Discuss = mongoose.model('Discuss');

module.exports = {

  show: function(req, res) {
    var id = mongoose.Types.ObjectId(req.params.id); // Discuss ID
   
    return Discuss.findById(id, function (err, thing) {
  
      if (!err) {
        return res.json(thing);
      } else {
        return res.send(err);
      }
      
    });
  }

}
