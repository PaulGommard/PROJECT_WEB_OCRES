const Profile = require('../models/profile.model.js').Profile;

function findAll(req, res) {
    return Profile.find()
        .exec()
        .then((result) => {
            if (result.length > 0) {
                res.json(result)
            } else {
                res.status(202).json({ message: 'no Profiles available' })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

function findByLastName(req, res) {
    const lastNameParam = req.params.name;
    return Profile.find({lastName: lastNameParam})
        .exec()
        .then((result) => {
            if (result.length > 0) {
                res.json(result)
            } else {
                res.status(202).json({ message: 'no Profiles available' })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

function saveOne(req, res) {
    const newProfile = new Profile(req.body);

    return newProfile
        .save()
        .then((result) => {
            res
                .status(201)
                .json({ message:  `user ${result.id} created`, content: result })
        })
        .catch((err) => {
            if(err.errors && Object.keys(err.errors).length > 0 && err.name === 'ValidationError') {
                res.status(422).json({ message: err.message })
            } else {
                res.status(500).json(err)
            }
        })
}

function deleteByLastName(req, res) {
    const nameParam = req.params.name;

    return Profile.deleteOne({ name: nameParam })
        .then((result) => {
            if(result) {
                res.json({ message: `${result.deletedCount} deleted` })
            } else {
                res.status(404).json({ message: `Profile not found`})
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

function updateProfile(req, res) {
    const nameParam = req.params.name;

    return Location.updateOne({ name: nameParam }, req.body)
        .then((result) => {
            if (result) {
                res.json({ message: `${result.modifiedCount} updated` })
            } else {
                res.status(404).json({ message: `Location not found` })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

module.exports = { saveOne, findAll, findByLastName, deleteByLastName, updateProfile }