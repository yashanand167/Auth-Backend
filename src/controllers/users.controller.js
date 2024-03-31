import { User } from "../models/users.model.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: do zod validation
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
    }

    const newUser = await User.create({
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error.message);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    await res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
