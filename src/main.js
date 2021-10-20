import fs from 'fs'
const homedir = require('os').homedir();
const filePath = `${homedir}/.money-track.json`

export function toGive(options) {
    if (!options.hasOwnProperty('togive')) return
    if (options.error.includes('value') || options.error.includes('title')) return
    var formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })
    let object = {
        title: options.title,
        description: options.description,
        target: options.target,
        value: formatter.format(options.togive),
        togive: true,
    }

    let parsedData = JSON.parse(fs.readFileSync(filePath))

    let index = 0

    if (Object.keys(parsedData).length > 0) {
        index = Number(Object.keys(parsedData)[Object.keys(parsedData).length - 1]) + 1
    }

    parsedData[index] = object

    console.log(parsedData)
    fs.writeFileSync(filePath, JSON.stringify(parsedData))
}

export function toReceive(options) {
    if (!options.hasOwnProperty('toreceive')) return
    if (options.error.includes('value') || options.error.includes('title')) return
    var formatter = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })
    let object = {
        title: options.title,
        description: options.description,
        target: options.target,
        value: formatter.format(options.toreceive),
        togive: false,
    }

    let parsedData = JSON.parse(fs.readFileSync(filePath))

    let index = 0

    if (Object.keys(parsedData).length > 0) {
        index = Number(Object.keys(parsedData)[Object.keys(parsedData).length - 1]) + 1
    }

    parsedData[index] = object

    console.log(parsedData)
    fs.writeFileSync(filePath, JSON.stringify(parsedData))
}
export function list() {
    let resToGive = "";
    let restoReceive = "";
    let parsedData = JSON.parse(fs.readFileSync(filePath))

    for (const trans in parsedData) {
        if (parsedData[trans].togive) {
            resToGive += (trans + ": ")
            resToGive += parsedData[trans].title + "\n"
            resToGive += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " to " + parsedData[trans].target : '') + "\n"
            resToGive += "   " + parsedData[trans].description + "\n"
        }
        else {
            restoReceive += (trans + ": ")
            restoReceive += parsedData[trans].title + "\n"
            restoReceive += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " from " + parsedData[trans].target : '') + "\n"
            restoReceive += "   " + parsedData[trans].description + "\n"
        }
    }
    console.log("GIVE\n" + resToGive)
    console.log("RECEIVE\n" + restoReceive)
}
