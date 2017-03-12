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
        skills: []
      }).then((data) => {
        res.send(data)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let updateUser = (req, res) => {
  user.findOne({
    username: req.params.username
  }).then((data) => {
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
  user.findOne({
    username: req.params.username
  }).then((data) => {
    if (!data) {
      res.send('user is not found!')
    } else {
      data.remove(req.params.username).then((result) => {
        res.send(`username ${result.username} has been deleted`)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let getOneUser = (req, res) => {
  user.findOne({
    username: req.params.username
  }).then((data) => {
    if (!data) {
      res.send('user is not found!')
    } else {
      res.send(data)
    }
  }).catch((e) => {
    if (e) throw e
  })
}

let addSkill = (req, res) => {
  user.findOne({
    username: req.params.username
  }).then((data) => {
    let arrSkill = []
    data.skills.forEach((skill) => {
      arrSkill.push(skill.name)
    })

    if (arrSkill.indexOf(req.body.skill) >= 0) {
      res.send('skill is already in used')
    } else if (req.body.score > 10) {
      res.send('score max 10')
    } else if (req.body.score < 1) {
      res.send('score min 1')
    } else {
      user.findOneAndUpdate({
        username: req.params.username
      }, {
        $push: {
          skills: {
            name: req.body.skill,
            score: req.body.score
          }
        }
      }, {
        new: true
      }).then((result) => {
        res.json(result)
      }).catch((e) => {
        if (e) throw e
      })
    }
  })
}

let getSkills = (req, res) => {
  user.find({
    username: req.params.username
  }).then((data) => {
    res.json(data[0].skills)
    console.log(data[0].skills)
  })
}

let deleteSkill = (req, res) => {
  user.findOne({
    username: req.params.username
  }).then((data) => {
    let arrSkill = []
    data.skills.forEach((skill) => {
      arrSkill.push(skill.name)
    })

    let index = arrSkill.indexOf(req.body.skill)
    if (index == -1) {
      res.send('skill is not found!')
    } else {
      user.findOneAndUpdate({
        username: req.params.username
      }, {
        $push: {
          skills: {
            name: req.body.skill
          }
        }
      }, {
        new: true
      }).then((data) => {
        res.send(data)
      })
    }
  })
}

module.exports = {
  seeders,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getOneUser,
  addSkill,
  getSkills
}
