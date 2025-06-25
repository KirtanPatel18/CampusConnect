const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const prisma = require("../config/db.js");

const register = async (req, res) => {
  const { email, password, username } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User with this email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      full_name: username,
    },
  });

  // Send response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, process.env.SECERET_KEY, {
    expiresIn: "1h",
  });

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true, // prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === "production", // only send over HTTPS in production
    sameSite: "strict", // protects against CSRF
    maxAge: 60 * 60 * 1000, // 1 hour in ms
  });

  // Send response
  res.status(200).json({
    success: true,
    message: "Login successful",
    user
  });
};

const checkExistingUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) return res.json({ success: false, message: "User Alredy Exist" });

    return res.json({ success: true, message: "User not Exist" });
  } catch (error) {
    console.log(error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP Email
async function sendOTPEmail(userEmail, otp) {
  const mailOptions = {
    from: process.env.USER,
    to: userEmail,
    subject: "Your OTP Code for Verification",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", userEmail);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}

const otpSender = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const otp = generateOTP();
  req.session.otp = otp; // Store OTP in session
  console.log("send-otp", req.session.otp);

  // await sendOTPEmail(email, otp);

  res.json({ success: true, message: "OTP sent to email" });
};

const verifyOtp = (req, res) => {
  const { otp } = req.body;

  console.log("Received OTP:", typeof req.body.otp, otp);
  console.log("Received OTP:", typeof parseInt(otp));
  console.log(
    "Stored OTP in session:",
    typeof req.session.otp,
    req.session.otp
  );

  if (!otp)
    return res
      .status(400)
      .json({ success: false, message: "OTP is required!" });

  if (parseInt(otp) === parseInt(req.session.otp)) {
    req.session.otp = null; // Clear OTP after successful verification
    return res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid OTP!" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token"); // or your cookie/session name
  res.json({ success: true, message: "Logged out successfully" });
};

module.exports = { register, login, checkExistingUser, otpSender, verifyOtp , logoutUser };
