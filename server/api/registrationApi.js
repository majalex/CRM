const express = require("express");
const router = express.Router();

const client = require('../controllers/registrationController');

//pobieranie wszystkich danych
router.get('/all', function(req, res){
    client.list(function(err, clients){
        if(err) {
            res.status(404);
            res.json({
                error: "Users not found"
            });
        } else {
            res.json(clients);
        }
    });
});

//pobieranie pojedyńczego uzytkownika
router.get("/:id", function (req, res) {
    client.get(req.params.id, function (err, client) {
      if (err) {
        res.json({ error: true });
        console.log(err);
      } else {
        res.json(client);
      }
    });
  });

//Rejestracja uzytkownika
router.post('/add', function (req, res) {
    client.add(req.body, function (err, client) {
        if(err) {
            res.status(404);
            res.json({
                error: "Client not added"
            });
        console.log(err);
        } else {
            res.json(client);
        }
    })
});

//zmiana danych
router.put('/update/:id', function(req, res){
    client.update(req.params.id, req.body, function(err, client){
        if(err) {
            res.status(404);
            res.json({
                error: "User not found"
            });
        } else {
            res.json(client);
        }
    });
     
})

//usówanie
router.delete('/delete/:id', function(req, res){
    client.delete(req.params.id, function(err, data){
        if(err) {
            res.status(404);
            res.json({
                error: "User not found"
            });
            console.log(err);
        } else {
            res.json(data);
        }
    });
     
});

module.exports = router;