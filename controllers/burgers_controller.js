const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(burger) {
    var handlebarsObject = {
      burger: burger
    };
    console.log(handlebarsObject);
    res.render("main", handlebarsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.name, req.body.devoured], function(result) {
    // Send back the ID of the new quote
    res.json({ burger_name: result.insertName });
  });
});

router.put("/api/burgers/:name", function(req, res) {
  var condition = "burger_name = " +  "'" + req.params.name + "'";

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: 1
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
