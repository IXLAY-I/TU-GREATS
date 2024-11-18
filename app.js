const mysql = require('mysql2')
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var bodyParser = require('body-parser')

var conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tugreats"
});

con = conection.promise();
conection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/users/login', async (req, res) => {
    let ID = req.body.ID
    let password = req.body.password
    try {
        const [login] = await con.query(`select * from users where ID = '${ID}' and password = '${password}'`)
        res.status(201).json({
            message: "Successful",
            data: login[0].name

        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users', async (req, res) => {
    let ID = req.body.ID
    try {
        const [data] = await con.query(`select * from users where ID = '${ID}'`)
        res.status(201).json({
            message: "Successful",
            StudentID: data[0].ID,
            name: data[0].name
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/register', async (req, res) => {
    let ID = req.body.ID
    let Examcenter = req.body.Examcenter
    let Date = req.body.Date
    let Time = req.body.Time
    let Coupon = req.body.Coupon
    try {
        const [AddData] = await con.query(`insert into register (ID, Examcenter, Date, Time, Coupon) VALUE ('${ID}', '${Examcenter}', '${Date}', '${Time}', '${Coupon}')`)
        res.status(201).json({
            message: "Successful"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/forums', async (req, res) => {
    let ID = req.body.ID
    let Text = req.body.Text
    try {
        const [data] = await con.query(`select ForumID from forums`)
        let existingIDs = data.map(row => row.ForumID);
        while (true) { 
            let ForumID = Math.floor(Math.random() * 1000000) + 1
            console.log(ForumID);
            if (!existingIDs.includes(String(ForumID))) {
                const [AddForums] = await con.query(`insert into forums (ForumID, ID, text, answer, likes) VALUE ('${ForumID}', '${ID}', '${Text}', ${0}, ${0})`)
                res.status(201).json({
                    message: "Successful"
                })
                break;
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/ForumLike', async (req, res) => {
    let ForumID = req.body.ForumID
    try {
        const [ForumLikeData] = await con.query(`select likes from forums where ForumID = '${ForumID}'`)
        let AddLike = ForumLikeData[0].likes + 1
        await con.query(`update forums set likes = ${AddLike} where ForumID = '${ForumID}'`)
        res.status(201).json({
            message: "Successful"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/show_forums', (req, res) => {
    conection.query(`select text, answer, likes from forums`, function (error, results, fields) {
        try {
            res.status(201).json({
                message: "Successful",
                data: results
            })
        }
        catch (error) {
            res.status(401).json({
                message: "Error"
            }, 401)
        }
    });
})

app.post('/users/Question', async (req, res) => {
    let Text = req.body.Text
    try {
        const [AddQuestion] = await con.query(`insert into question (Question, Answer, ShowQuestion) VALUE ('${Text}', '', '${false}')`)
        res.status(201).json({
            message: "Successful"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/show_question', async (req, res) => {
    try {
        const [data] = await con.query(`select * from question where ShowQuestion = ${true}`)
        res.status(201).json({
            message: "Successful",
            data: data
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port 1${port}`)
})