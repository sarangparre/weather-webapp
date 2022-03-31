const notes = require('./notes')
const yargs = require('yargs')


yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler: () => notes.listNotes()
})

yargs.command({
    command: 'read',
    describe: 'read list',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title)
})
yargs.parse()