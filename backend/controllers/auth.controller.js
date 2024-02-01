const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const { signUpSchema } = require('../helpers/validationSchema');
const { errorHandler } = require('../utils/error.js');
const UserService = require('../services/user.service');

exports.login = async (req, res, next) => {
  res.end('Login Success!!');
};

exports.signUp = async (req, res, next) => {
  try {
    const validationResult = await signUpSchema.validateAsync(req.body);

    const doesExist = await UserService.findOne({ email: validationResult.email });
    if (doesExist) {
      throw errorHandler(409, 'Email Id is already registered.');
    } else {
      const hashedPassword = bcryptjs.hashSync(validationResult.password, 10);

      const createdUser = await UserService.saveUser({
        name: validationResult.name,
        email: validationResult.email,
        password: hashedPassword
      });
      
      if (createdUser) {
        const access_token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...userWithoutPass } = createdUser._doc;

        res.cookie('access_token', access_token, { httpOnly: true })
          .status(200).json({
            success: true,
            message: "User Created Successfully!!",
            user: userWithoutPass
          });
      } else {
        throw errorHandler(500, 'Failed to create User.');
      }
    }

  } catch (error) {
    if (error.isJoi === true) error.statusCode = 422;
    next(error);
  }
}