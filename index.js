const express = require("express");
const cors = require("cors");
const movies = require("./firebase");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await movies.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

app.post("/create", async (req, res) => {
  const data = req.body;
  await movies.add({ data });
  res.send({ msg: "Movie Added" });
});

app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await movies.doc(id).update(data);
  res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  await movies.doc(id).delete();
  res.send({ msg: "Deleted" });
});
app.listen(3000, () => console.log("Server running on 3000"));
