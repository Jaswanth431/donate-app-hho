const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const paymentRoute = require('./routes/paymentRoutes')
const donationsReceived = require('./routes/donationsReceivedRoutes');
const postsRoute = require('./routes/postsRoute');
const donatedtoRoute = require('./routes/donatedtoRoute');
const userRoute = require('./routes/userRoute');
const path = require('path');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:'http://localhost:3000', credentials:true}));
app.use(cookieParser());
app.use(express.static('client/build'));


app.use('/payments', paymentRoute);
app.use('/api/donationsreceived', donationsReceived);
app.use('/api/posts', postsRoute);
app.use('/api/donatedto', donatedtoRoute);
app.use('/api/user', userRoute);

app.use('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

module.exports = app;