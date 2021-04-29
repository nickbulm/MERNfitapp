var jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = req.headers["authorization"].split(" ")[1];
    if (!token)
      return res.status(403).send({auth: false, message: "No token provided."});

    jwt.verify(token, tokenSecret, function (err, decoded) {
        if (err) {
            console.log(err);
            return res
              .status(500)
              .send({auth:false, message: "Failed to authenticate token."});
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = verifyToken;