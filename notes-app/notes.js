const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title)
    debugger
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.bgGreen.black("New note added!"));
  } else {
    console.log(chalk.bgRed.black("Title is already taken!"));
  }
};

const saveNotes = (note) => {
  const jsonNotes = JSON.stringify(note);
  fs.writeFileSync("notes.json", jsonNotes);
};

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const jsonData = bufferData.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title != title);
  if (notes.length != notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen.black("Note removed!"));
  } else {
    console.log(chalk.bgRed.black("No note found!"));
  }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'))
    notes.forEach(element => {
        console.log(element.title)
    });
    
}

const readNotes = (title) => {
    const notes = loadNotes();
    const searchNote = notes.find((note) => note.title === title)
    if(searchNote){
        console.log(chalk.inverse(searchNote.title))
        console.log(searchNote.body)
    }else{
        console.log(chalk.red('No note found!'))
    }
    
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};
