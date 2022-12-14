const Client = require('../models/Client');


function clientList(cb) {
    Client.find().sort({createdAt:-1}).lean().exec(function(err, clients) {
        if(err) {
            cb(err)
        } else {
            cb(null, clients)
        }
    });
}

function clientAdd(data, cb) {
    let newClient = new Client(data);
 
    newClient.save(function(err, Client){
        if (err) {
            cb(err);
        } else {
            cb(null, Client);
        }
    });
}

function clientUpdate(id, data, cb) {
    Client.findOneAndUpdate({_id: id}, data, function(err, client) {
 
        if(err) {
            cb(err);
        } else {
            cb(null, client);
        }
 
    });
}

function clientDelete(id, cb) {
    Client.deleteOne({_id: id},function (err, client) {
        if (err) {
            cb(err);
        } else {
            cb(null, client);
        }
    });
}

function clientGet(id, cb) {
    Client.findById(id)
    .populate("events")
      .exec(function (err, client) {
        if (err) {
          cb(err);
        } else {
          cb(null, client);
        }
      });
  }


module.exports = {
    list: clientList,
    add: clientAdd,
    update: clientUpdate,
    delete: clientDelete,
    get: clientGet,
}