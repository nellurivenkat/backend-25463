const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Registerconst
const Register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      state,
      city,
      country,
      password,
    } = req.body;

    console.log(req.body);

    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json("Email already belongs to an account");
    }

    // Strip phone number (remove spaces, dashes, etc.)
    const strippedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const existingPhone = await User.findOne({
      phoneNumber: strippedPhoneNumber,
    });
    if (existingPhone) {
      return res.status(400).json("Phone number already belongs to an account");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (including password field)
    const newUser = new User({
      fullName,
      email: lowerCaseEmail,
      phoneNumber: strippedPhoneNumber,
      address,
      state,
      city,
      country,
      password: hashedPassword,
    });

    // Save new user
    await newUser.save();
    // Create JWT
    const token = jwt.sign(
      { id: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Spread user details and exclude password
    const userWithoutPassword = {
      ...newUser.toObject(),
      password: undefined,
    };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user account");
  }
};
// Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Convert email to lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Check if user exists
    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Enter a valid password");
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};


module.exports = { Register, Login };
