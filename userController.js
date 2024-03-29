import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const userRegister = async (req, res) => {
  try {
    const userInfo = req.body;
    const oldUser = await userModel.findOne({ email: userInfo.email });

    if (oldUser) {
      return res.status(401).json({ message: "email already exist" });
    }
    const hashPassword = await bcrypt.hash(userInfo.password, 12);
    const user = await userModel.create({
      fullname: userInfo.FullName,
      username: userInfo.UserName,
      email: userInfo.email,
      password: hashPassword,
    });
    console.log(userInfo);
    res.status(200).json({ message: "Registration succesfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const secret = "JgtQGPzlFORS0j8ugFT5KEFEFjilKNHwCsILXF/rOk4=";
    const userInfo = req.body;
    const oldUser = await userModel.findOne({ email: userInfo.email });
    if (!oldUser) {
      return res.status(401).json({ message: "wrong email" });
    }
    const checkPassword = await bcrypt.compare(
      userInfo.password,
      oldUser.password
    );
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credential" });
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "2d",
    });
    const formattedResult = {
      id: oldUser._id,
      email: oldUser.email,
      fullname: oldUser.fullname,
      username: oldUser.username,
    };
    res.status(200).json({ result: formattedResult, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user information
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params._id;
    const { fullname, username, phoneNumber, location } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.fullname = fullname;
    user.username = username;

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (location) {
      user.location = location;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUserProfile, updateUserProfile };
