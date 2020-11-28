const express = require('express');
const usersModel = require('../models/usersModel');

exports.post = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await usersModel.registerUser(name, email, password);

  return res.status(201).json({ user });
};
