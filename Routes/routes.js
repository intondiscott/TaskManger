const express = require("express");
const router = express.Router();
const {
  getInfo,
  createInfo,
  getId,
  updateTask,
  delId,
} = require("../Controllers/routing");
router.route("/").get(getInfo).post(createInfo);
router.route("/:id").get(getId).patch(updateTask).delete(delId);

module.exports = router;
