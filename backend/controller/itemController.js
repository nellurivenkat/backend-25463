const Item = require("../models/Item");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dcoszeorz",
  api_key: "145454218247266",
  api_secret: "W3coCAvwbA8YhkM1bJrDjx8U7TQ",
});

// Function to upload image to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { body, files } = req;

    // Check if thumbnail is provided
    let thumbnailUrl = "";
    if (files.thumbnail && files.thumbnail[0]) {
      thumbnailUrl = await uploadToCloudinary(files.thumbnail[0]);
    }

    // Check if images are provided
    let imagesUrls = [];
    if (files.images && files.images.length > 0) {
      imagesUrls = await Promise.all(
        files.images.map((image) => uploadToCloudinary(image))
      );
    }

    // Create new item with thumbnail and images URLs
    const newItem = new Item({
      ...body,
      thumbnail: thumbnailUrl,
      images: imagesUrls,
    });

    // Save the item to the database
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Error creating item" });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const { body, files } = req;

    // Upload thumbnail to Cloudinary if provided
    if (files.thumbnail && files.thumbnail[0]) {
      body.thumbnail = await uploadToCloudinary(files.thumbnail[0]);
    }

    // Upload images to Cloudinary if provided
    if (files.images && files.images.length > 0) {
      body.images = await Promise.all(
        files.images.map((image) => uploadToCloudinary(image))
      );
    }

    // Update the item in the database
    const updatedItem = await Item.findByIdAndUpdate(req.params.itemId, body, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Error updating item" });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Error fetching items" });
  }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Error fetching item" });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.itemId);
    res.status(204).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
};
