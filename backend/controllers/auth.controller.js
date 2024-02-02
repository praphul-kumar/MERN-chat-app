const jwt = require('jsonwebtoken');
const { signUpSchema, signInSchema } = require('../helpers/validationSchema');
const { errorHandler } = require('../utils/error.js');
const UserService = require('../services/user.service');

exports.login = async (req, res, next) => {
  try {
    const validationResult = await signInSchema.validateAsync(req.body);

    const user = await UserService.findOne({ email: validationResult.email });

    if (user && user.comparePassword(validationResult.password)) {
      const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...userWithoutPass } = user._doc;

      res.cookie('access_token', access_token, { httpOnly: true })
        .status(200).json({
          success: true,
          message: "User Login Successfully!!",
          user: userWithoutPass
        });
    } else {
      throw errorHandler(401, "Invalid credentials.");
    }
  } catch (error) {
    if (error.isJoi === true) error.statusCode = 422;
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const validationResult = await signUpSchema.validateAsync(req.body);

    const doesExist = await UserService.findOne({ email: validationResult.email });
    if (doesExist) {
      throw errorHandler(409, 'Email Id is already registered.');
    } else {
      const createdUser = await UserService.saveUser({
        name: validationResult.name,
        email: validationResult.email,
        password: validationResult.password
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