const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const pool = require("../config/dbConnection");
const nodemailer = require('nodemailer');

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const generateOTP = () => {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
};

function generateAuthToken(userId) {
    return jwt.sign({ userId }, "secretKey", { expiresIn: '365d' }); // Adjust the expiration time as needed
    // return jwt.sign({ userId }, secretKey, { expiresIn: '1m' }); // Adjust the expiration time as needed
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Changed to lowercase 'authorization'

    console.log("this is the auth token", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secretKey', (err, decoded) => { // Changed to lowercase 'secretKey'
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        console.log('Decoded Token Payload:', decoded);

        req.user = decoded; // Set user data in the request object
        next();
    });
};

module.exports = { verifyToken };


const registerUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const [existingUser] = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: "User already registered!" });
        }

        const otp = generateOTP();

        const hashedOtp = await bcrypt.hash(otp, 10);

        const mailOptions = {
            from: 'codestream63@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for registration is: ${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending OTP:", error);
                return res.status(500).json({ success: false, message: "Failed to send OTP" });
            } else {
                console.log("otp : ", otp)
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ success: true, message: "OTP sent successfully", hashedOtp: hashedOtp });
            }
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, userOtp, hashedOtp } = req.body;

        console.log(req.body)

        const [existingUser] = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {

            const isOtpMatched = await bcrypt.compare(userOtp, hashedOtp);

            if (!isOtpMatched) {
                return res.status(400).json({ success: false, message: "Invalid OTP" });
            }

            const accessToken = generateAuthToken(email)

            return res.status(201).json({ success: true, message: "User Loged in successfully", accessToken: accessToken });
        } else {

            const { name, lastName } = req.body;

            const isOtpMatched = await bcrypt.compare(userOtp, hashedOtp);

            if (!isOtpMatched) {
                return res.status(400).json({ success: false, message: "Invalid OTP" });
            }

            const userInsertResult = await pool.promise().query("INSERT INTO users (name,lastname, email) VALUES (?,?,?)", [name, lastName, email]);

            const accessToken = generateAuthToken(email)

            return res.status(201).json({ success: true, message: "User registered successfully", accessToken: accessToken });
        }

    } catch (error) {
        console.error("Error verifying OTP and registering user:", error);

        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.body;

        const [existingUser] = await pool.promise().query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {

            const otp = generateOTP();

            console.log(otp)

            const hashedOtp = await bcrypt.hash(otp, 10);

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'OTP Verification',
                text: `Your OTP for Login is: ${otp}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error("Error sending OTP:", error);
                    return res.status(500).json({ success: false, message: "Failed to send OTP" });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ success: true, message: "OTP sent successfully", hashedOtp: hashedOtp });
                }
            });
        } else {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const [allUserData] = await pool.promise().query("SELECT * FROM users")

        return res.status(201).json(allUserData[2])

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}



module.exports = {
    registerUser,
    verifyOtp,
    loginUser,
    getAllUsers,
    verifyToken
};

