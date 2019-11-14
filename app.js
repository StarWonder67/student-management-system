const port = 8000;
const express = require('express');
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
app.use(express.static('./assets'));


const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "student_enrollment"
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    console.log(err);
    return;
  }
  console.log('Connection to database established');
});

app.get('/', function (req, res) {

    res.render('home', { title: 'home' });
});

// app.get('/student_table', function (req, res) {

//     res.render('student_table', { title: 'student-table', table: s_info});
// });

app.get('/sign-in', function (req, res) {

    res.render('sign_in', { title: 'sign-in'});
});

app.get('/sign-up', function (req, res) {

    res.render('sign_up', { title: 'sign-up' });
});


app.get("/allStudents",function(req,res){

var displayStudents = "select * from student";

con.query(displayStudents,function(err,result){

    if(err){
        console.log("error in displaying students " + err);
    }
    else{

        console.log(result);

    }


    res.render('allStudents',{ result: result});
});


    
});



app.post("/",function(req,res){

    var name = req.body.name;
    var dob = req.body.dob;
    var rank = req.body.rank;
    var newStudent = { name: name, dob: dob, rank: rank};

    console.log(newStudent);

    var insertQuery = "insert into student(name,dob,rank) values('"+name+"','"+dob+"','"+rank+"')";
    con.query(insertQuery,function(err,result){
            if(err){
                console.log("error in entering into table student" + err);
            }
            else{
                console.log("inserted successfully " );
            }
    });

});

app.listen(port, function (err) {

    if (err) {
        console.log('there was an error in connecting to the express server');
        return;
    }
    console.log(`the server is up and running on port ${port}`);
})
