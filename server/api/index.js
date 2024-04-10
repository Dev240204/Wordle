const express = require("express")
const app = express()
const port = 5000
const connectToMongoDB = require('./connect');
const bodyParser = require('body-parser')
const Test = require('../models/Test')
const User = require('../models/User')
const Word = require('../models/Word')
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(bodyParser.json())

connectToMongoDB()
  .then(() => {
    console.log('Application started');
  })
  .catch((error) => {
    console.error('Error starting application:', error);
  });


app.get('/',async (req, res) => {
    res.send('Server running fine')
    // const data = await Test.find({})
    // res.send({data})
})

app.post('/test',async (req,res) => {
  try {
    const newData = req.body.name
    const result = await Test.create({ name: newData });
    res.send({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ success: false, message: 'User not found', status: 404});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ success: false, message: 'Invalid credentials', status: 401});
    }
    res.send({ success: true, data: user });
  } catch (error) {
    console.error('Error occurred during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/register', async(req,res)=>{
  const {name, email, password} = req.body
  const user = await User.findOne({email:email})
  if(user){
    return res.send({ success: false, message: 'User already exists', status: 409});
  }
  const username = await User.findOne({name:name})
  if(username){
    return res.send({ success: false, message: 'Username already exists', status: 408});
  }
  if(password.length < 6){
    return res.send({ success: false, message: 'Password must be at least 5 characters', status: 400});
  }
  const hashpassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({name:name, email:email, password:hashpassword})
  res.send({ success: true, data: newUser });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})