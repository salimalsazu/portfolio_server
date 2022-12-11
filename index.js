const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
//cors
app.use(cors());
//middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.zka99gz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);


async function run() {
    try {
        const usersCollection = client.db('portfolio').collection('users');
        const projectsCollection = client.db('portfolio').collection('project');
        const blogsCollection = client.db('portfolio').collection('blog');
        const achievmentsCollection = client.db('portfolio').collection('achievment');

        // const user = {
        //     name: 'Salim'
        // }
        // const result = usersCollection.insertOne(user);


        //Get Admin
        app.get('/admin', async (req, res) => {
            const query = {}
            const cursor = await usersCollection.find(query).toArray();
            res.send(cursor);
        })


        //Get Project
        app.get('/homeprojects', async (req, res) => {
            const query = {}
            const cursor = projectsCollection.find(query).sort({ current: -1 });
            const project = await cursor.limit(3).toArray();
            res.send(project);
        })


        //Get Blog
        app.get('/homeblogs', async (req, res) => {
            const query = {}
            const cursor = blogsCollection.find(query).sort({ current: -1 });
            const blog = await cursor.limit(6).toArray();
            res.send(blog);
        })

        //Get Achievment
        app.get('/homeachievment', async (req, res) => {
            const query = {}
            const cursor = achievmentsCollection.find(query).sort({ current: -1 });
            const achievment = await cursor.limit(3).toArray();
            res.send(achievment);
        })




        //Admin Create in DataBase
        app.post('/admin', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        //Projects Create in DataBase
        app.post('/projects', async (req, res) => {
            const project = req.body;
            const result = await projectsCollection.insertOne(project);
            res.send(result);
        })


        //Blog Create in DataBase
        app.post('/blogs', async (req, res) => {
            const blog = req.body;
            const result = await blogsCollection.insertOne(blog);
            res.send(result);
        })

        //Achievment Create in DataBase
        app.post('/achievment', async (req, res) => {
            const achievment = req.body;
            const result = await achievmentsCollection.insertOne(achievment);
            res.send(result);
        })

    }
    finally {

    }


}
run().catch((err) => console.error(err))

















app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})