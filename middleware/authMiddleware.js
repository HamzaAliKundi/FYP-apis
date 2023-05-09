const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const RegisterUser = require("../models/account/registerModel");

const protect = asyncHandler(async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         // Get token from header
         token = req.headers.authorization.split(" ")[1];

         //   Verify token
         const decoded = jwt.verify(token, "tokenSecretKey123");

         //   Get user from token
         req.user = await RegisterUser.findById(decoded.id).select("-password");

         next();
      } catch (error) {
         console.log(error);
         res.status(401);
         throw new Error("Not Authorized");
      }
   }

   if (!token) {
      res.status(401);
      throw new Error("Not Authorized, No Token");
   }
});

module.exports = { protect };
