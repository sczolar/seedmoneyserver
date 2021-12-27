import Usermodel from "../model/user/usermodel.js";

export const userprivi = async (req, res, next) => {
  const userid = req.get("userid");

  const userprivi = await Usermodel.findOne({ _id: userid });

  if (!userid || !userprivi) {
    req.roll = false;
    return next();
  }

  req.roll = userprivi.roll;
  return next();
};
