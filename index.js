const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const app = express()
app.use(express.json())
const dbUrl = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(dbUrl)

// creating new mentor
app.post('/createMentor', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("mentorData").findOne({ mentorEmailId: req.body.mentorEmailId })
        if (!mentor) {
            await db.collection("mentorData").insertOne(req.body);
            res.status(201).send({ message: 'New mentor created', data: req.body })
        }
        else {
            res.status(400).send({ message: 'This email Id already exist' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all created mentors
// app.get('/', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         const db = await client.db("Student_Mentor_Management");
//         let mentor = await db.collection("mentorData").find().toArray()
//         if (mentor.length == 0) {
//             res.status(404).send({ message: 'No mentor created yet !' })
//         }
//         else {
//             res.status(200).send({ data: mentor })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting mentor by name
// app.get('/mentorName/:mentorName', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         // console.log('connected')
//         const db = await client.db("Student_Mentor_Management");
//         let mentor = await db.collection("mentorData").findOne({ mentorName: req.params.mentorName })
//         if (!mentor) {
//             res.status(404).send({ message: `No mentor data found associated with mentor name ${req.params.mentorName}` })
//         }
//         else {
//             res.status(200).send({ data: mentor })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // creating new student
// app.post('/createStudent', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         const db = await client.db("Student_Mentor_Management");
//         let student = await db.collection("studentData").findOne({ studentEmail: req.body.studentEmail })
//         if (!student) {
//             // console.log(req.body)
//             await db.collection("studentData").insertOne(req.body);
//             res.status(201).send({ message: 'New student created successfully', data: req.body })
//         }
//         else {
//             res.status(400).send({ message: `Student with ${req.body.studentEmail} already exist` })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting all students
// app.get('/getAllStudents', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         const db = await client.db("Student_Mentor_Management");
//         let student = await db.collection("studentData").find().toArray()
//         if (student.length == 0) {
//             res.status(404).send({ message: 'No student created yet !' })
//         }
//         else {
//             res.status(200).send(student)
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting student by name
// app.get('/getStudent/:studentName', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         // console.log('connected')
//         const db = await client.db("Student_Mentor_Management");
//         let student = await db.collection("studentData").findOne({ studentName: req.params.studentName })
//         if (!student) {
//             res.status(404).send({ message: `No student data found associated with student name ${req.params.studentName}` })
//         }
//         else {
//             res.status(200).send({ data: student })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // assigning student to mentor
// app.post('/assigningStudent/:mentorName', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         const db = await client.db("Student_Mentor_Management");
//         let mentor = await db.collection("mentorData").findOne({ mentorName: req.params.mentorName })
//         if (mentor) {
//             let studInfo = await db.collection("Students Assigned Mentor").findOne({ studentName: req.body.studentName })
//             if (!studInfo) {
//                 await db.collection("Students Assigned Mentor").insertOne({ mentorName: req.params.mentorName, studentName: req.body.studentName, studentEmail: req.body.studentEmail })
//                 await db.collection("studentData").deleteOne({studentName: req.body.studentName})
//                 res.status(200).send({ message: 'Student assigned to mentor', data: req.body })
//             }
//             else {
//                 res.status(400).send({ message: `${req.body.studentName} already assigned with ${req.params.mentorName}` })
//             }
//         }
//         else {
//             res.status(400).send({ message: `No mentor data found associated with mentor name ${req.params.mentorName}` })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // assigning/changing mentor for particular student 
// app.put('/assigningMentor/:studentName', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         const db = await client.db("Student_Mentor_Management");
//         let student = await db.collection("Students Assigned Mentor").findOne({ studentName: req.params.studentName })
//         if (student) {
//             await db.collection('Students Assigned Mentor').updateOne({ studentName: req.params.studentName }, { $set: { mentorName: req.body.mentorName } })
//             res.status(200).send({ message: `${req.body.mentorName} assigned to ${req.params.studentName}`})
//         }
//         else {
//             res.status(404).send({ message: `No student data found associated with student name ${req.params.studentName}` })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

// // getting students info for a particular mentor
// app.get('/getStudents/:mentorName', async (req, res) => {
//     const client = await MongoClient.connect(dbUrl);
//     try {
//         // console.log('connected')
//         const db = await client.db("Student_Mentor_Management");
//         let mentor = await db.collection("Students Assigned Mentor").find({ mentorName: req.params.mentorName }).toArray()
//         if (mentor.length==0) {
//             res.status(400).send({ message: `No students assigned to ${req.params.mentorName}` })
//         }
//         else {
//             res.status(200).send({ data: mentor })
//         }
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'Internal server error', error })
//     }
//     finally {
//         client.close()
//     }
// })

app.listen(5000, () => console.log(`App is listening to 5000`))