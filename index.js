const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
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
const portfolio = require('./routes/portfolio');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const error = require('./middlewares/error');

const app = express();

require('./startup/prod')(app);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

if (!config.get('db')) {
    console.error('FATAL ERROR: DB URI is not defined');
    process.exit(1);
}

const portfolioDB = config.get('db');
mongoose.connect(portfolioDB)
    .then(() => console.log("SUCCESS: Connected to Portfolio database..."))
    .catch((error) => console.log("OOPS: Failed to connect to database...", error));

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(cors({credentials: true, origin: 'https://portfolio-builder.prajwalp.com.np'}));

app.use('/assets/images', express.static(path.join('assets', 'images')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/personalInfo', personalInfo);
app.use('/api/v1/backgroundInfo', backgroundInfo);
app.use('/api/v1/contact', contact);
app.use('/api/v1/experience', experience);
app.use('/api/v1/otherProject', otherProject);
app.use('/api/v1/featuredProject', featuredProject);
app.use('/api/v1/skills', skills);
app.use('/api/v1/portfolio', portfolio);

const PORT = process.env.PORT || 5000;
const HOSTNAME = "127.0.0.1";
app.listen(PORT, () => console.log(`Connected to http://${HOSTNAME}:${PORT}...`));