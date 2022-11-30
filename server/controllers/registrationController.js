const Client = require('../models/Client');


function clientList(cb) {
    Client.find().lean().exec(function(err, clients) {
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
    Client.updateOne({_id: id}, data, function(err, Client) {
 
        if(err) {
            cb(err);
        } else {
            cb(null, Client);
        }
 
    });
}

function clientDelete(id, cb) {
    Client.deleteOne({_id: id},function (err, Client) {
        if (err) {
            cb(err);
        } else {
            cb(null, Client);
        }
    });
}

function clientGet(id, cb) {
    Client.findById(id)
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