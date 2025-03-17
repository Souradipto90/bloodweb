const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/auth', (req, res) => {
    res.sendFile(__dirname + '/auth.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/additional-info', (req, res) => {
    res.sendFile(__dirname + '/additional-info.html');
});

app.post('/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    users.push({ fullName, email, password });
    res.redirect('/auth');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.redirect('/additional-info');
    } else {
        res.send('Invalid email or password');
    }
});

app.post('/additional-info', (req, res) => {
    const { address, bloodGroup, relatives, phoneNumber } = req.body;
    // Here you can save the additional info to the user or database
    res.send('Additional information submitted successfully!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});