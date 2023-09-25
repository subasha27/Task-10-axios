const express = require("express");
const mongoose = require("mongoose");
const route = require('./router/route');


const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api',route)

mongoose.connect(
    'mongodb+srv://subash:atlas123@cluster0.yujnvsk.mongodb.net/Userdata?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});