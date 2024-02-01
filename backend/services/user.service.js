const User = require('../models/UserModel') 

exports.find = async (user) => {
  try {
    return await User.find(user);
  } catch (error) {
    throw error;
  }
}

exports.saveUser = async (user) => {
  try {
    let result = null;
    if (user instanceof User) {
      result = await user.save();
    } else {
      result = await new User(user).save();
    }

    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          phone: data.phone,
          password: data.password,
        },
      },
      { new: true }
    );

    const { password, ...userWithoutPass } = updatedUser._doc;

    return userWithoutPass;

  } catch (error) {
    throw error;
  }
};

exports.updateStatus = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          status: data.status,
        },
      },
      { new: true }
    );

    const { password, ...userWithoutPass } = updatedUser._doc;

    return userWithoutPass;

  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}

exports.findOne = async (userData) => {
  try {
    return await User.findOne(userData);
  } catch (error) {
    throw error;
  }
};
