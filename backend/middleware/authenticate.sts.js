const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateSTS = (req, res, next) => {
  const token = req.header('Authorization');
  // console.log("Token:",token)
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log('Decode:',decoded)
    if(decoded.userType === 'sts'){
      next();
    }else{
      return res.status(401).json({ message: 'STS Access Only' });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateSTS;