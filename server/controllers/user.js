import { body, validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { userRepository } from "../repositories/index.js";

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  // Call repository
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  // destructuring
  const { name, email, password, balance } = req.body;

  try {
    debugger;
    const user = await userRepository.register({
      name,
      email,
      password,
      balance,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.id;

    const userInfo = await userRepository.getUserProfile(userId);

    res.status(HttpStatusCode.OK).json({
      message: "User profile retrieved successfully",
      data: userInfo,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deposit = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const newBalance = await userRepository.deposit(id, amount);

    if (newBalance !== null) {
      // The deposit was successful, and newBalance is not null
      res.status(HttpStatusCode.OK).json({
        message: "Deposit successful",
        data: newBalance,
      });
    } else {
      // Handle the case when the user is not found
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: "User not found",
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const newBalance = await userRepository.withdraw(id, amount);

    if (newBalance !== null) {
      // The withdrawal was successful, and newBalance is not null
      res.status(HttpStatusCode.OK).json({
        message: "Withdraw successful",
        data: newBalance,
      });
    } else {
      // Handle the case when the user is not found or has insufficient balance
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "User not found or insufficient balance",
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const users = await userRepository.viewAllUsers();

    if (users) {
      res.status(HttpStatusCode.OK).json({
        message: "All users retrieved successfully",
        data: users,
      });
    } else {
      // Handle the case when no users are found
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: "No users found",
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
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
