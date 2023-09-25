const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/router");
const route1 = require("./route/userSignup");



const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/apis',route1)
app.use('/api',route)
app.use('/views', express.static('./views'));



mongoose.connect(
    'mongodb+srv://subash:atlas123@cluster0.yujnvsk.mongodb.net/crud?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
        useUnifiedTopology:true,
    }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});