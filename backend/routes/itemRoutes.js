const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD
router.post("/", auth, async (req, res) => {
  const item = await Item.create({
    ...req.body,
    user: req.user,
  });
  res.json(item);
});

// GET ALL
router.get("/", auth, async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// SEARCH
router.get("/search", auth, async (req, res) => {
  const items = await Item.find({
    name: { $regex: req.query.name, $options: "i" },
  });
  res.json(items);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(401).json({ msg: "Not allowed" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(401).json({ msg: "Not allowed" });

  await item.deleteOne();
  res.json({ msg: "Deleted" });
});

module.exports = router;