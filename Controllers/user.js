const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const User = require("../models/users");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  console.log(req.body)
  const {
    username,
    password,
    profileType,
    email,
    firstName,
    lastName,
  } = req.body;
  if (
    (!username,
    !password,
    !profileType,
    !email,
    !firstName,
    !lastName)
  ) {
    res.status(400);
    throw new Error("Favor de proporcionar todos los datos requeridos.");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("El nombre de usuario ya existe.");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("La dirección email ya se encuentra registrada.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    profileType,
    active: false,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileType: user.profileType,
      active: user.active,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Datos no validos.");
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileType: user.profileType,
      active: user.active,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Verifique su usuario y/o contraseña.");
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
