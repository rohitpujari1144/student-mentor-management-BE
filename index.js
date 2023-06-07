const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)

// creating new mentor
app.post('/createMentor', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        await db.collection("mentorData").insertOne(req.body);
        res.status(201).send({ message: 'New mentor created', data: req.body })
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
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("mentorData").find().toArray()
        if (mentor.length == 0) {
            res.status(404).send({ message: 'No mentor created yet !' })
        }
        else {
            res.status(200).send({ data: mentor })
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

// creating new student
app.post('/createStudent', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").findOne({ studentEmail: req.body.studentEmail })
        await db.collection("studentData").insertOne(req.body);
        res.status(201).send({ message: 'New student created successfully', data: req.body })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all students
app.get('/getStudents', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let allStudents = await db.collection("studentData").find().toArray()
        res.status(200).send({ data: allStudents })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all students with no mentors
app.get('/getAllStudents', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let mentor = await db.collection("studentData").find({ assignedMentor: "" }).toArray()
        if (mentor.length == 0) {
            res.status(404).send({ message: 'No student created yet !' })
        }
        else {
            res.status(200).send({ data: mentor })
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

// assigning mentor to student
app.put('/assignMentor/:studentEmailId', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        await db.collection("studentData").updateOne({ studentEmailId: req.params.studentEmailId }, {$set: req.body})
        res.status(200).send({ message: 'Mentor assigned to student !' })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// getting all students of a particular mentor
app.get('/getAllStudents/:mentorName', async (req, res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db("Student_Mentor_Management");
        let student = await db.collection("studentData").find({ assignedMentor: req.params.mentorName }).toArray()
        if (student.length == 0) {
            res.status(404).send({ message: 'No student assigned to mentor yet !' })
        }
        else {
            res.status(200).send(student)
        }
    }
    // catch (error) {
    //     console.log(error)
    //     res.status(500).send({ message: 'Internal server error', error })
    // }
    finally {
        client.close()
    }
})

app.listen(5000, () => console.log(`App is listening to 5000`))
