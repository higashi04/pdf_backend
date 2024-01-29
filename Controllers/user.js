const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const User = require("../models/users");
// const brother = require("../models/bros");

const { mailBodyRegister } = require("../utilities/Emails");

const mailRegister = async (mail, user, password) => {
  const smtpTransport = nodeMailer.createTransport({
    service: "Outlook",
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD
    },
  });
  const mailOptions = {
    to: mail,
    from: process.env.MAIL,
    subject: "Creación de cuenta",
    html: mailBodyRegister(mail, user, password),
    text: "we've been trying to reach you about your car insurance.",
  };
  console.log(mailOptions);
  console.log(process.env.MAIL)
  console.log(process.env.MAIL_PASSWORD)
  smtpTransport.sendMail(mailOptions);
};

const generateToken = (id) => {
  console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);

  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    algorithm: "RS256",
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, congregacion } =
    req.body;
  if ((!username, !password, !email, !firstName, !congregacion, !lastName)) {
    res.status(400);
    throw new Error("Favor de proporcionar todos los datos requeridos.");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    console.log(userExists);
    res.status(400);
    throw new Error("El nombre de usuario ya existe.");
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    console.log(emailExists);
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
    congregacion,
  });
  // await brother.create({
  //   nombre: `${firstName} ${lastName}`,
  //   congregacion,
  //   activo: true,
  // })
  if (user) {
    mailRegister(email, username, password);
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      congregacion: user.congregacion,
      //token: generateToken(user._id),
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
      congregacion: user.congregacion,
      //token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Verifique su usuario y/o contraseña.");
  }
};

const tryOutnodemailer = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body)
    if(!email) {
      throw new Error("body is empty")
    }
    await mailRegister(email, "poncho", "qwerty");
    console.log("test");
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500);
    console.log(error)
    throw new Error("This failed lol");
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

const getAllByCongregationId = async(req, res) => {
  try{
    const {congregacionId} = req.body.data;

    const users = await User.find({congregacion: congregacionId}).populate({path: 'congregacion'})

    if(!users) {
      res.status(400);
      throw new Error("Not Found")
    }
    console.log(users)
    res.status(201).json({
        users
    })

  } catch (error) {
    res.status(500);
    console.log(error)
    throw new Error(error);
  }
};

const updateUser = async(req, res) => {
  try {
    const { username, password, email, firstName, lastName, congregacion, id } =
    req.body;
  if ((!username, !password, !email, !firstName, !congregacion, !lastName)) {
    res.status(400);
    throw new Error("Favor de proporcionar todos los datos requeridos.");
  }
  console.log("update point")


  const foundUser = await User.findById(id)

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  foundUser.username = username;
  foundUser.password = hashedPassword;
  foundUser.firstName = firstName;
  foundUser.lastName = lastName;
  foundUser.congregacion = congregacion

  await foundUser.save();
  res.status(201).json({foundUser})

  } catch (error) {
    res.status(500);
    console.log(error)
    throw new Error(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  tryOutnodemailer,
  getAllByCongregationId,
  updateUser,
};
