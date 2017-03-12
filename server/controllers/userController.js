'use strict'

const express = require('express')
const user = require('../models/user')
const seederUser = require('../seeders/user')
require('../db')

let seeders = (req, res) => {
  user.create(seederUser, (e, users) => {
    if (e) throw e
    res.send(users)
  })
}

let getUsers = (req, res, next) => {
  user.find({}).then((users) => {
    !users ? req.send('user is not found!') : res.send(users)
  }).catch((e) => {
    if (e) throw e
  })
}

let createUser = (req, res, next) => {
  user.findOne({
    username: req.body.username
  }).then((username) => {
    if (username) {
      res.send('Username is already used')
    } else {
      user.create({
        username: req.body.username,
        skills: req.body
      }).then((data) => {
        res.send(data)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let updateUser = (req, res) => {
  user.findById(req.params.id).then((data) => {
    if (!data) {
      res.send('user is not found!')
    } else {
      data.update(req.body).then((user) => {
        res.send(user)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let deleteUser = (req, res) => {
  user.findById(req.params.id).then((data) => {
    if (!data) {
      res.send('user is not found!')
    } else {
      data.remove(req.params.id).then((result) => {
        res.send(`username ${result.username} has been deleted`)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let getOneUser = (req, res) => {
  user.findById(req.params.id).then((data) => {
    if (!data) {
      res.send('user is not found!')
    } else {
      res.send(data)
    }
  }).catch((e) => {
    if (e) throw e
  })
}

module.exports = {
  seeders,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getOneUser
}
