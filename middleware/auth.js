const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'cbf26c8ff444bdc0992de71d978e1c20ebcb923e_8bab9c6f84ac4619f1ae493b6331775c14c287f3');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    console.log(req);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};