const ClientEvent = require("../models/ClientEvent");
const Client = require("../models/Client");

function addClientEvent(clientId, data, cb) {
  let newClientEvent = new ClientEvent({ ...data, client: clientId });
  newClientEvent.save(function (err, clientEvent) {
    if (err) {
      cb(err);
    } else {
      Client.findById(clientId, function (err, client) {
        if (err) return;

        client.events.push(clientEvent._id);
        client.save();
      });
      cb(null, clientEvent);
    }
  });
}

function deleteClientEvent(clientId, clientEventId, cb) {
  Client.findById(clientId, function (err, client) {
    if (err) return;

    client.events.pull(clientEventId);
    client.save();
  });

  ClientEvent.deleteOne({ _id: clientEventId }, function (err, log) {
    if (err) {
      cb(err);
    } else {
      cb(null, log);
    }
  });
}



function updateClientEvent(clientId, clientEventId, data, cb) {
  Client.findById(clientId, function (err, client) {
    if (err) return;

    client.events.push(clientEventId);
    client.save();
  });

  ClientEvent.findOneAndUpdate({ _id: clientEventId }, data, function (err, log) {
    if (err) {
      cb(err);
    } else {
      cb(null, log);
    }
  });
}

module.exports = {
  add: addClientEvent,
  delete: deleteClientEvent,
  update: updateClientEvent,
};