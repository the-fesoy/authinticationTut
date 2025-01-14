const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");
exports.signup = async (req, res, next) => {
  const {name, password, email } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist){

   return  next(new ErrorResponse('E-mail already exists', 400))
  }

  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("E-mail and password are required", 400));
    }

    // check user e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // verify user password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }
    console.log(Number(process.env.EXPIRE_TOKEN))
    generateToken(user, 200, res);
  } catch (error) {
    console.log(error);

    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + Number(process.env.EXPIRE_TOKEN)),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

//LOG OUT USER
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
exports.userProfile = async (req, res, next) => {
const user = await User.findById(req.user.id);
res.status(200).json({
  success: true,
  user
})
}
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // the mistake if there was any is here because i replaced user with params cause im tryna be smart
    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
