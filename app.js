import express from "express";
import connect from "./connectBD/connect.js";

const app = express();

app.use(express.json())

app.get("/api/message", (req, res) => {
    res.json({msg: "hello world!"});
})

app.get("/api/tareas", (req, res) => {

    async function fetchData() {

        const db = await connect();

        try {
          // Query to get all users
          const [rows, fields] = await db.execute('SELECT * FROM tareas');

          res.status(200).json(rows);
      
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          db.end();
        }
      }
      fetchData()
})

app.post("/api/users", (req, res) => {

    if (!req.body.name) {
        res.status(400).json({msg: "name is required"})
    }
    res.status(201).json({msg: "user created"});
})

app.get("/api/users", (req, res) => {

    res.json([
        {id: 1, name: "Juan"},
        {id: 2, name: "Faber"}
    ]);
})

export default app