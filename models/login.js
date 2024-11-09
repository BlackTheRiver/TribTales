// login.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const session = require('express-session');
app.use(express.static('public'));  

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // ค้นหาผู้ใช้จากฐานข้อมูล
    const user = await User.findOne({ username });

    // ตรวจสอบว่า username และ password ตรงกันหรือไม่
    if (user && await user.isValidPassword(password)) {
        req.session.userId = user._id;  
        res.redirect('/dashboard'); // ไปยังหน้า dashboard หลังจากล็อกอินสำเร็จ
    } else {
        res.send("Invalid username or password");
    }
});


module.exports = router;
