// const jwt = require("jsonwebtoken");
// const secret = process.env.secretKey;
// const userModel = require("../model/userModel");

// module.exports = async (req, res, next) => {
//   const barreToken = req.headers.authorization;
//   console.log(">>>>>barreToken>>>>>>>>", barreToken);
//   if (!barreToken) {
//     return res.status(401).json({ message: "no token provided" });
//   }
//   const token = barreToken.split(" ")[1];
//   console.log(">>>>>>>>token>>>>>>>>>>", token);

//   if (!token) {
//     return res.status(401).json({ message: "no token found" });
//   }

//   const decode = jwt.verify(token, secret);
//   console.log(">>>>>>>decode>>>>>>>", decode);

//   if (!decode) {
//     return res.status(401).json({ message: "invalid token" });
//   }

//   req.user = {
//     id: user._id,
//     email: user.email,
//     role: user.role,
//   };

//   const user = await userModel.findOne({ email: decode.email });
//   console.log(">>>>>>user>>>>>>", user);

//   if (!user) {
//     return res.status(401).json({ message: "invalid user" });
//   }

//   req.user = user;

//   next();
// };





// const jwt = require("jsonwebtoken");
// const secret = process.env.secretKey;
// const userModel = require("../model/userModel");

// module.exports = async (req, res, next) => {
//   const barreToken = req.headers.authorization;

//   if (!barreToken) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = barreToken.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token found" });
//   }

//   try {
//     const decode = jwt.verify(token, secret);

//     if (!decode) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     const user = await userModel.findOne({ email: decode.email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid user" });
//     }

//     req.user = {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     };

//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     res.status(401).json({ message: "Invalid token or error occurred" });
//   }
// };





const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const secret = process.env.secretKey;

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided or wrong token format" });
    }

    const token = bearerToken.split(" ")[1];

    const decoded = jwt.verify(token, secret);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};