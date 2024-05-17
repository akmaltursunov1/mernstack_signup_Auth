const jwt = require("jsonwebtoken");
// const userModel = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("tzimga kirishngiz kk");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("xatolik auth api dan");
    }
    req.user = user;
    next();
  });
  // try {
  //   const token = req.cookie.token;
  //   console.log(cookies);
  //   // const token = cookies.split("=")[1];
  //   console.log(token);
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
  //     if (err) {
  //       return res.status(401).send({
  //         success: false,
  //         message: "foydalanuvchi royxatdan otmagan",
  //       });
  //     } else {
  //       req.body.id = decode.id;
  //       next();
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send({
  //     success: false,
  //     message: "auth token api dan xatolik",
  //     error,
  //   });
  // }
};
// check if user is authenticated
// const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;

//   // Make sure token exists
//   if (!token) {
//     return res.status(401).send({
//       success: false,
//       message: "token yoq",
//     });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await userModel.findById(decoded.id);

//     next();
//   } catch (err) {
//     return next(new ErrorResponse("You must log in.", 401));
//   }
// };

module.exports = { isAuthenticated };
