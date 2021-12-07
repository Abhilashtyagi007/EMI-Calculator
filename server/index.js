const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'tyagi',
    host: 'localhost',
    password: 'tyagityagi',
    database: 'EMI'
})



// app.get('/create', (req, res) => {
//     res.send('hello');
// })

app.post('/create', (req, res) => {
    console.log(req.body);
    const amount = req.body.amount;
    const interest = req.body.interest;
    const tenure = req.body.tenure;
    const emi = req.body.emi;
    const payableInterest = req.body.payableInterest;
    const totalPayment = req.body.totalPayment;

    //console.log(totalPayment);

    db.query('INSERT INTO Loan (amount,interest,tenure,emi,payable_interest,total_payment) VALUES (?,?,?,?,?,?)',
        [amount, interest, tenure,emi,payableInterest,totalPayment],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
                console.log(res.status);
            }
        }
    );
})


app.listen(4000, () => {
    console.log("Listening on 4000")
})