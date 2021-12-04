const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mysql');
const fileUpload = require('express-fileupload')
const app = express();
const port = process.env.PORT || 4000;


app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())


const con = sql.createConnection({
    host: "localhost",
    user: 'root',
    database : 'registerforrann'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });




app.get('/', (req, res)=>{
    res.send('Running backend ')
})

app.post('/', (req, res)=>{
    let name = `'${req.body.name}'`
    let email = `'${req.body.email}'`
    let password = `'${req.body.password}'`
    let cloudLink = `'${req.body.cloudLink}'`

    console.log(req.body)
  if(req.files === null){
    return res.status(400).json({message : "No file uploaded"})
  }
  var sql =  `INSERT INTO users (name, email, password, fileurl) VALUES (${name},${email}, ${password}, ${cloudLink})`;
  con.query(sql , (err , result)=>{
    if (err) {
      console.log(err.message);
    }
    else{
    console.log('Recored inserted successfully')   
    }
    
  })
  

  // console.log(req.files.myfile)
})
app.listen(port , ()=>{
    console.log(`listening on  ${port}`)
})