import express from "express";
const port = 3000;
const app = express();

// middleware
app.use(express.json());

const data = [];
let teaId = 1;

//Add a tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newData = { id: teaId++, name, price };
  data.push(newData);
  res.status(201).send(newData);
});

// get all teas

app.get("/tea", (req, res) => {
  res.send(data);
});

// get a tea with id
app.get("/tea/:id", (req, res) => {
  const tea = data.find((user) => user.id === parseInt(req.params.id));
  if (!tea) res.status(404).send("Tea not found!");
  res.status(200).send(tea);
});

// update the tea content
app.put("/tea/:id", (req, res) => {
  const tea = data.find((user) => user.id === parseInt(req.params.id));
  if (!tea)
    res.status(404).send("You can not update tea because it not available.");
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete the tea
app.delete("/tea/:id", (req, res) => {
  const index = data.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) res.status(404).send("Index not found.");
  data.splice(index, 1);
  return res.status(200).send(`1 item is deleted.`);
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
