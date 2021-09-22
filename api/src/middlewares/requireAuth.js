const User = require('../user/controller');

module.exports = async (req, res, next) => {
  const decodedToken = req.token;

  if (!decodedToken) {
    return res.sendStatus(401);
  } else {
    const userRecord = await User.findById(decodedToken.id);
    console.log('userRecord: ', userRecord);
    req.currentUser = userRecord;
    if (!userRecord) {
      return res.sendStatus(401);
    } else {
      return next();
    }
  }
};