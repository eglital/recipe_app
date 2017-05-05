const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("./../models");
const Recipe = mongoose.model("Recipe");
const { loggedInOnly, adminOnly } = require("../helpers/sessions");

router.get("/", loggedInOnly, adminOnly, (req, res) => {
  Recipe.find()
    .populate("owner")
    .sort({ createdAt: "desc" })
    .then(recipes => {
      res.render("admin/admin", { recipes });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.get("/reported", loggedInOnly, adminOnly, (req, res) => {
  Recipe.find({ reportedBy: { $gt: [] } })
    .populate("reportedBy owner")
    .then(recipes => {
      res.render("admin/reported", { recipes });
    })
    .catch(e => res.status(500).send(e.stack));
});

router.delete("/reports/:id", loggedInOnly, adminOnly, (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { reportedBy: [] })
    .then(() => {
      req.method = "GET";
      res.redirect("back");
    })
    .catch(e => res.status(500).send(e.stack));
});
module.exports = router;
