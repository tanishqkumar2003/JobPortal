const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const register = async (req, res) => {
  const { fullname, email, phoneNumber, password, role } = req.body;
  if (!fullname || !email || !password || !phoneNumber || !role) {
    return res.status(411).json({
      message: "All feilds are required",
    });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(411).json({
      message: "User already exists with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  res.status(200).json({
    message: "Account created successfully",
  });
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(411).json({
      message: "All feilds are required",
    });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(411).json({
      message: "Incorrect email or password",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(411).json({
      message: "incorrect password",
    });
  }

  if (role !== user.role) {
    return res.status(411).json({
      message: "Account dosen't exist with curent role",
    });
  }

  const tokenData = {
    userId: user._id,
  };
  const token = await jwt.sign(tokenData, JWT_SECRET, { expiresIn: "1d" });

  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: user.profile,
  };

  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    })
    .json({
      message: `Welcome back ${user.fullname}`,
      user,
    });
};

const logout = (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Loged out successfully",
  });
};

const updateProfile = async (req, res) => {
  const { fullname, phoneNumber, email, bio, skills } = req.body;
  const file = req.file;

  if (skills) {
    const skillsArray = skills.split(",");
  }
  const userId = req.id;

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });

  res.json({
    message: "Updated Successfully",
  });
};

module.exports = {
  login,
  logout,
  register,
  updateProfile,
};
