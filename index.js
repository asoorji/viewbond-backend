const express = require("express");
const cors = require("cors");
const movies = require("./firebase");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/movies", async (req, res) => {
  const snapshot = await movies.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

// Route handler for the root path
app.get('/', (req, res) => {
  res.redirect('/api-docs'); })

app.post("/create", async (req, res) => {
  const data = req.body;
  await movies.add({ data });
  res.send({ msg: "Movie Added" });
});

app.post("/update", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await moviesCollection.doc(id).set(data, { merge: true });
    res.send({ msg: "Updated" });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await movies.doc(id).delete();
  res.send({ msg: "Deleted" });
});

app.listen(3000, () => console.log("Server running on 3000"));
