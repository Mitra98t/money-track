import fs from 'fs'
const homedir = require('os').homedir();
const filePath = `${homedir}/.money-track.json`

export function toGive(options) {
    if(!options.hasOwnProperty('togive')) return

    let parsedData = JSON.parse(fs.readFileSync(filePath))
    console.log(parsedData)
}
export function toReceive(options) {
    
}