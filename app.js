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
            Login:login
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
                    message: "Successful",
                    ForumID: ForumID
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
    conection.query(`select * from forums`, function (error, results, fields) {
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

app.post('/users/forum_answer', async (req, res) => {
    let ForumID = req.body.ForumID
    let ID = req.body.ID
    let Text = req.body.Text
    try {
        const [addData] = await con.query(`insert into answers (ForumID, IDAnswer, answer) VALUE ('${ForumID}', '${ID}', '${Text}')`)
        const [countcomment] = await con.query(`select answer from forums where ForumID = '${ForumID}'`)
        let addcountanswer = countcomment[0].answer + 1
        await con.query(`update forums set answer = ${addcountanswer} where ForumID = '${ForumID}'`)
        res.status(201).json({
            message: "Successful"
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/show_answer', (req, res) => {
    conection.query(`select answers.IDAnswer, answers.answer, forums.text from answers join forums on answers.ForumID = forums.ForumID`, function (error, results, fields) {
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

app.post('/users/history', async (req, res) => {
    let ID = req.body.ID
    try {
        const [round] = await con.query(`select round from examresult where ID = '${ID}'`)
        const date = await con.query(`SELECT
            CONCAT(
                CASE DAYOFWEEK(Expiration_date)
                    WHEN 1 THEN 'วันอาทิตย์'
                    WHEN 2 THEN 'วันจันทร์'
                    WHEN 3 THEN 'วันอังคาร'
                    WHEN 4 THEN 'วันพุธ'
                    WHEN 5 THEN 'วันพฤหัสบดี'
                    WHEN 6 THEN 'วันศุกร์'
                    WHEN 7 THEN 'วันเสาร์'
                END,
                'ที่ ',
                DAY(Expiration_date),
                ' ',
                CASE MONTH(Expiration_date)
                    WHEN 1 THEN 'มกราคม'
                    WHEN 2 THEN 'กุมภาพันธ์'
                    WHEN 3 THEN 'มีนาคม'
                    WHEN 4 THEN 'เมษายน'
                    WHEN 5 THEN 'พฤษภาคม'
                    WHEN 6 THEN 'มิถุนายน'
                    WHEN 7 THEN 'กรกฎาคม'
                    WHEN 8 THEN 'สิงหาคม'
                    WHEN 9 THEN 'กันยายน'
                    WHEN 10 THEN 'ตุลาคม'
                    WHEN 11 THEN 'พฤศจิกายน'
                    WHEN 12 THEN 'ธันวาคม'
                END,
                ' ',
                YEAR(Expiration_date)
            ) AS date
            FROM examresult where ID = '${ID}';`)
        res.status(201).json({
            message: "Successful",
            round: round,
            date: date[0]
        })
    } catch (error) {
        res.status(401).json({
            message: "Error"
        })
    }
})

app.post('/users/show_score', async (req, res) => {
    let ID = req.body.ID
    try {
        const [teamleader] = await con.query(`select L, M, Exempt from teamleader join examresult on teamleader.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        const [tu100] = await con.query(`select D, V, G, Exempt from tu100 join examresult on tu100.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        const [tu101] = await con.query(`select H, Z, Y, C, T, Exempt from tu101 join examresult on tu101.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        const [tu102] = await con.query(`select U, A, P, Exempt from tu102 join examresult on tu102.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        const [tu103] = await con.query(`select I, S, O, Exempt from tu103 join examresult on tu103.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        const [tu106] = await con.query(`select R, B, W, E, F, Exempt from tu106 join examresult on tu106.Result_number = examresult.Result_number where examresult.ID = '${ID}'`)
        res.status(201).json({
            message: "Successful",
            teamleader: teamleader,
            tu100: tu100,
            tu101: tu101,
            tu102: tu102,
            tu103: tu103,
            tu106: tu106
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