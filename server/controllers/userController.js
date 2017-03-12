'use strict'

const express = require('express')

let getUsers = (req, res, next) => {
  res.send('sucsess')
}

module.exports = {
  getUsers
}
