const express = require("express");
const router = express.Router();
const multer = require("multer");
const itemController = require("./controller/itemController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage: storage });

// Create a new item with file uploads
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  itemController.createItem
);

// Get all items
router.get("/", itemController.getAllItems);

// Get a single item by ID
router.get("/:itemId", itemController.getItemById);

// Update an item by ID with file uploads
router.put(
  "/:itemId",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  itemController.updateItem
);

// Delete an item by ID
router.delete("/:itemId", itemController.deleteItem);

module.exports = router;
