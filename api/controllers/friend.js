const express = require("express");
const router = express.Router();

const Friend = require('../models/friend');

router.get('/', async(req, res) => {
    try {
        const friends = await Friend.all;
        res.json(friends);
    } catch (err) {
        res.status(500).json({err})
    }
})

router.get('/:id', async(req, res) => {
    try {
        const friend = await Friend.findById(parseInt(req.params.id));
        res.json(friend);
    } catch (err) {
        res.status(500).json({err})
    }
})

router.post('/', async(req, res) => {
    try {
        const friend = await Friend.create(req.body.name, req.body.age, req.body.birthday, req.body.children);
        res.json(friend);
    } catch (err) {
        res.status(404).json({err})
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        const updatedFriend = await friend.update(req.body.name, req.body.age, req.body.birthday, req.body.children)
        res.json(updatedFriend);
    } catch (err) {
        res.status(500).json({err})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const friend = await Friend.findById(req.params.id);
        await friend.delete()
        res.status(204).json('Friend deleted');
    } catch (err) {
        res.status(500).json({err})
    }
})

module.exports = router;





