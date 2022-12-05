const express = require("express");
const router = express.Router();

const clientEvent = require("../controllers/clientEventController");

router.post("/add/:clientId", function (req, res) {
  clientEvent.add(
    req.params.clientId,
    req.body,
    function (err, clientEvent) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(clientEvent);
      }
    }
  );
});

router.delete("/delete/:clientId", function (req, res) {
  clientEvent.delete(
    req.params.clientId,
    req.body.clientEventId,
    function (err, log) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(log);
      }
    }
  );
});

router.update("/update/:clientId", function (req, res) {
  clientEvent.update(
    req.params.clientId,
    req.body.clientEventId,
    function (err, log) {
      if (err) {
        res.json({ error: true });
      } else {
        res.json(log);
      }
    }
  );
});

module.exports = router;