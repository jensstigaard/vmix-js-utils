// Dependencies
const Connection = require('../src/connection')
const CommandSender = require('../src/command-sender')

// Modules
let connection = new Connection('localhost', 8088)
let commandSender = new CommandSender(connection)

// Perform commands
// You can use any vMix Function here
// List of all functions here: 
// https://www.vmix.com/help20/ShortcutFunctionReference.html

// Perform a simple cut
commandSender.send({ Function: 'Cut' })

// Perform multiple commands at once:
// - Set text of field "TitleField"  in title number 1 to the text "Updated text!"
// - Put on input 1 in overlay channel 1
// - Cut
commandSender.send([
    { Function: 'SetText', Input: 1, SelectedName: 'TitleField', Value: 'Updated text!' },
    { Function: 'OverlayInput1On', Input: 1 },
    { Function: 'Cut' }
])