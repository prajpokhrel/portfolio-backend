const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const auth = require('./routes/auth');
const users = require('./routes/users');
const personalInfo = require('./routes/personalInfo');
const backgroundInfo = require('./routes/backgroundInfo');
const contact = require('./routes/contact');
const experience = require('./routes/experience');
const featuredProject = require('./routes/featuredProject');
const otherProject = require('./routes/otherProject');
const skills = require('./routes/skills');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/portfolio')
    .then(() => console.log("SUCCESS: Connected to Community database..."))
    .catch((error) => console.log("OOPS: Failed to connect to database...", error));

app.use(express.json());
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({credentials: true, origin: true}));
// app.use(cors());

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/personalInfo', personalInfo);
app.use('/api/v1/backgroundInfo', backgroundInfo);
app.use('/api/v1/contact', contact);
app.use('/api/v1/experience', experience);
app.use('/api/v1/otherProject', otherProject);
app.use('/api/v1/featuredProject', featuredProject);
app.use('/api/v1/skills', skills);

const PORT = process.env.PORT || 5000;
const HOSTNAME = "127.0.0.1";
app.listen(PORT, () => console.log(`Connected to http://${HOSTNAME}:${PORT}...`));