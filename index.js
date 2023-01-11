const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bp = require('body-parser');

const app = express();
const port = 3005;


app.use(cors());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

const corsOptions = {
    origin: "*",
    methods: "get",
    optionsSuccessStatus: 200
}

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "infosys"
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected database');
})



app.get("/", (req, res) => {
    let selectSQL = "select * from spring";

    conn.query(selectSQL, (err, rows) => {
        if (err) throw err;

        res.send(rows);
        console.log(rows);
        res.end();
    })
})

app.post("/add",(req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    console.log(data);

    //insert
    let insertSQL = `insert into spring(Emp_ID,Emp_name,Emp_Designation,Emp_Deparment,Emp_Salary,Emp_Location) values(${data.Emp_ID},'${data.Emp_name}','${data.Emp_Designation}','${data.Emp_Deparment}',${data.Emp_Salary},'${data.Emp_Location}')`;

    conn.query(insertSQL, (err)=>{
        if (err) throw err;
        res.send('Entry Inserted!');
        res.end();
    })
})

app.post("/update",(req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    console.log(data);

    let updateSQL = `update spring set Emp_name='${data.Emp_name}', Emp_Designation='${data.Emp_Designation}',Emp_Deparment='${data.Emp_Deparment}',Emp_Salary='${data.Emp_Salary}',Emp_Location='${data.Emp_Location}' where Emp_ID = ${data.Emp_ID}`;

    conn.query(updateSQL, (err)=> {
        if (err) throw err;

        res.send('Updated');
        res.send();
    })
});


app.post('/delete',(req,res)=>{
    res.status(200);
    res.setHeader('content-type','application/json');

    let data = req.body;

    let deleteSQL = `delete from Spring where Emp_ID=${data.Emp_ID}`;

    conn.query(deleteSQL, (err)=>{
        if (err) throw err;

        res.send('Deleted');
        res.end();
    })
})


app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
})