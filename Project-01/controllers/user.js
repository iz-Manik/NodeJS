const User = require('../models/user');

async function handleGetAllUsers(req, res) {
  const user = await User.find();
  return res.json(users);
}

async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  }
  return res.status(404).send('User not found');
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
    return res.status(400).send('Please provide all details');
  }
  try {
    const newUser = await User.create(body);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).send('Could not save the user to the database');
  }
}

async function handleUpdateUserById(req, res) {
  const id = await User.findByIdAndUpdate(req.params.id, { last_name: 'changed' }, { new: true });
  if (!id) {
    return res.status(404).send('User not found');
  }
  return res.json(id);
}

async function handleDeleteUserById(req, res) {
  const id = await User.findByIdAndDelete(req.params.id);
  if (!id) {
    return res.status(404).send('User not found');
  }
  return res.status(204).send('User deleted');
}

module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
};

