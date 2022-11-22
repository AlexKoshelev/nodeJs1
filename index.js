const yargs = require("yargs");
const { printNotes, addNote, remove } = require("./notes.controller");
yargs.command({
  command: "add",
  describe: "Adds new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});
yargs.command({
  command: "list",
  describe: "print all notes",
  handler() {
    printNotes();
  },
});
yargs.command({
  command: "remove",
  describe: "remove selected note",
  builder: {
    id: {
      type: "string",
      description: "note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    await remove(id);
  },
});
yargs.parse();
