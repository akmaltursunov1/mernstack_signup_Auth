// const jwt = require("jsonwebtoken");

// const isAuthenticated = async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log(token);
//   if (!token) {
//     return res.status(401).send("tzimga kirishngiz kk");
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send("xatolik auth api dan");
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = { isAuthenticated };
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("is authenticaddan keldi bu token" + "         " + token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "login bilan kirishingiz kerak tzimga",
        });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "please provide auth token",
      error,
    });
  }
};
module.exports = { isAuthenticated };
