const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('simple node server running');
});

const users = [
    { id: 1, name: 'Tareque', email: 'shad.tbh@gmail.com' },
    { id: 2, name: 'Asif', email: 'asif@gmail.com' },
    { id: 3, name: 'Elma', email: 'Elma@gmail.com' },
    { id: 4, name: 'Eqra', email: 'eqra@gmail.com' },
    { id: 5, name: 'Sujana', email: 'sujana@gmail.com' },
    { id: 6, name: 'Seam', email: 'seam@gmail.com' },
];


// user: dbUser1
// password: qcmCZna4H8gy5zIa




const uri = "mongodb+srv://dbUser1:qcmCZna4H8gy5zIa@cluster0.yqn9rlw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("simpleNode").collection("users");
    // perform actions on the collection object
    console.log('database connected')
    client.close();
});




app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered)
    }
    else {
        res.send(users)
    }
});

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user)
})

app.listen(port, () => {
    console.log(`simple node server running on port ${port}`)
})