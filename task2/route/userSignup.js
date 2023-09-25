const express = require("express");
const router = express.Router();
const axios = require("axios");


router.post('/signup', async (req, res) => {
    try {

        const userData = req.body;
        console.log(userData)

        const response = await axios.post('http://localhost:6000/api/signup', userData);


        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'User signup failed' });
    }
});
router.post('/users', async (req, res) => {
    try {

        const userData = req.body;
        console.log(userData)

        const response = await axios.post('http://localhost:6000/api/users', userData);


        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/alluser', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:6000/api/alluser');
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'User login failed' });
    }
});

router.post('/resetReq', async (req, res) => {
    try {

        const userData = req.body;
        console.log(userData)

        const response = await axios.post('http://localhost:6000/api/resetReq', userData);


        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'User signup failed' });
    }
});

router.post('/:userId/:token', async (req, res) => {
    try {


        const userData = {
            userId: req.params.userId,
            token: req.params.token,
            password: req.body.password
        }

        console.log(userData)
        const response = await axios.post(`http://localhost:6000/api/${userData.userId}/${userData.token}`, userData);
        console.log(response, "..................")

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error signing up user:', error); 
        res.status(500).json({ error: 'User signup failed' });
    }
});


module.exports = router;