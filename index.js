const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, remove, edit } = require("./notes.controller");

const host = "localhost";
const port = 3000;

const app = express(); //экспресс самостоятельно выставляет все настройки для браузера
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "pages"); // указываем нужную папку

app.use(express.urlencoded({ extended: "true" }));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});
app.delete("/:id?", async (req, res) => {
  await remove(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.put("/:id", async (req, res) => {
  await edit(req.params.id, req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});
app.listen(port, host, () => {
  console.log(chalk.green(`Server is running on http://${host}:${port}`));
}); //создаем сервер
