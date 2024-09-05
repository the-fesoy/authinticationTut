const jwt = require('jsonwebtoken');
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");


//checking if user is authinticated
exports.isAuthinticated = async (req, res, next) => {

    const { token } = req.cookies;
;

    if(!token){
        return next(new ErrorResponse('sign in first', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('sign in first', 401));
    }
}