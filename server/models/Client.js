const mongoose = require("mongoose");

// db connect
mongoose.connect('mongodb://localhost:27017/crm',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


const schema = new mongoose.Schema ({
    name: {type: String, required: true},
    street: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    nip: {type: String, required: true},
    events: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ClientEvent",
        },
      ],
}, { timestamps: true });
 
module.exports = mongoose.model('Client', schema);