const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Tommi Sipiläinen",
        "number": "040 561 629",
        "id": 5
    },
    {
        "name": "Asd",
        "number": "421",
        "id": 6
    },
    {
        "name": "rwqre",
        "number": "123",
        "id": 7
    },
    {
        "name": "rslkaj",
        "number": "291032",
        "id": 8
    },
    {
        "name": "sladkj",
        "number": "20198",
        "id": 9
    },
    {
        "name": "asda",
        "number": "2312",
        "id": 10
    }
]

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.get("/", (req, res) => {
    res.send('<h1>Moi!</h1>')
})

app.get("/api/persons", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((person) => person.id === id)
    res.header("Access-Control-Allow-Origin", "*");
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)
    res.header("Access-Control-Allow-Origin", "*");
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    const person = req.body
    console.log(person)
    res.header("Access-Control-Allow-Origin", "*");
    res.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

