const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    await jwt.verify(token, process.env.jwtSecret, (error, decoded)=>{
      if(error){
        res.status(401).json({ message: 'Token is not valid' });
      }
      else{
        req.id = decoded.user.id;
        next();
      }
    });
  } catch (err) {
    res.clearCookie("token");
    res.status(505).json({ message: 'Server Error' });
  }
};
