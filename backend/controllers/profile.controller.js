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
                .json({ message:  `profile ${result.id} created`, content: result })
        })
        .catch((err) => {
            if(err.errors && Object.keys(err.errors).length > 0 && err.name === 'ValidationError') {
                res.status(422).json({ message: err.message })
            } else {
                res.status(500).json(err)
            }
        })
}

async function deleteByLastName(req, res) {
    console.log("test");
    const nameParam = req.params.name;

    try {
        const result = await Profile.deleteOne({ lastName: nameParam });
        if (result) {
            res.json({ message: `${result.deletedCount} deleted` });
        } else {
            res.status(404).json({ message: `Profile not found` });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

function updateProfile(req, res) {
    const id = req.params.id;

    return Profile.updateOne({ _id: id }, req.body)
        .then((result) => {
            if (result) {
                res.json({ message: `${result.modifiedCount} updated` })
            } else {
                res.status(404).json({ message: `Profile not found` })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

module.exports = { saveOne, findAll, findByLastName, deleteByLastName, updateProfile }