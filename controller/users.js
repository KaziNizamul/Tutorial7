const model = require('../model/users');

const Users = model.users;

exports.getUsers = async (_, res) => {
  try {
    const users = await Users.find();
    const formattedUsers = users.map(user => ({
      email: user.email,
      firstName: user.firstName,
      id: user._id
    }));
    res.status(200).json({
      message: 'Users retrieved',
      success: true,
      users: formattedUsers
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve users'
    });
  }
};

exports.getUsersByid = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId).select('email firstName _id')
    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        firstName: user.firstName,
        id: user._id
      }
    });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve user'
    });
  }
};

exports.createUsers = (req, res) => {
  const users = new Users(req.body);
  users.save()
    .then(() => {
      res.status(200).json({
        message: 'User added',
        success: true
      });
    })
    .catch(error => {
      res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    });
};

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  Users.findByIdAndUpdate(userId, updateData)
  .then(updatedUser => {
    res.status(200).json({
      message: 'User updated',
      success: true,
    });
  })
  .catch(err => {
    res.status(400).json({
      error: 'Update Error',
      message: err.message
    });
  });

};
exports.deleteUser = (req, res) => {
  const userID = req.params.id;

  Users.findByIdAndDelete(userID)
    .then(deletedUser => {
      if (!deletedUser) {
        return res.status(404).json({
          error: 'User not found',
          success: false
        });
      }
      res.status(200).json({
        success: true,
        message: 'User deleted'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: 'Delete Error',
        message: err.message
      });
    });
};