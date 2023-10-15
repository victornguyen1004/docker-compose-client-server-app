import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcryptjs"; // Import bcryptjs
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password); // Use bcryptjs
    if (!!isMatch) {
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "Not showed",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};

const register = async ({ name, email, password, balance }) => {
  let existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    balance,
  });
  return {
    ...newUser._doc,
    password: "Not showed",
  };
};

const getUserProfile = async (id) => {
  try {
    const userId = id;
    const userInfo = await User.findById(userId).select("-password").exec();
    if (!userInfo) {
      throw new Exception(Exception.USER_NOT_FOUND);
    }
    return userInfo.toObject();
  } catch (error) {
    throw new Exception(Exception.INTERNAL_SERVER_ERROR);
  }
};

const deposit = async (id, amount) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    const totalBalance = user.balance + amount;
    user.balance = totalBalance;
    await user.save();
    return totalBalance;
  } catch (error) {
    return error;
  }
};

const withdraw = async (id, amount) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }
    const totalBalance = user.balance - amount;
    user.balance = totalBalance;
    await user.save();
    return totalBalance;
  } catch (error) {
    return error;
  }
};

const viewAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  getUserProfile,
  deposit,
  withdraw,
  viewAllUsers,
};
