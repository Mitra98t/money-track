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
        resolved: false,
    }

    let parsedData = JSON.parse(fs.readFileSync(filePath))

    let index = 0

    if (Object.keys(parsedData).length > 0) {
        index = Number(Object.keys(parsedData)[Object.keys(parsedData).length - 1]) + 1
    }

    parsedData[index] = object

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
        resolved: false,
    }

    let parsedData = JSON.parse(fs.readFileSync(filePath))

    let index = 0

    if (Object.keys(parsedData).length > 0) {
        index = Number(Object.keys(parsedData)[Object.keys(parsedData).length - 1]) + 1
    }

    parsedData[index] = object

    fs.writeFileSync(filePath, JSON.stringify(parsedData))
}

export function resolve(options) {
    if (!options.hasOwnProperty("resolve")) return

    let parsedData = JSON.parse(fs.readFileSync(filePath))
    parsedData[options.resolve].resolved = true
    fs.writeFileSync(filePath, JSON.stringify(parsedData))
}

export function list(options) {
    let resToGive = "";
    let resToReceive = "";
    let ResResTG = "";
    let ResResTR = "";
    let parsedData = JSON.parse(fs.readFileSync(filePath))

    for (const trans in parsedData) {
        if (parsedData[trans].resolved) {
            if (parsedData[trans].togive) {
                ResResTG += (trans + ": ")
                ResResTG += parsedData[trans].title + "\n"
                ResResTG += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " to " + parsedData[trans].target : '') + "\n"
                ResResTG += "   " + parsedData[trans].description + "\n"
            }
            else {
                ResResTR += (trans + ": ")
                ResResTR += parsedData[trans].title + "\n"
                ResResTR += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " from " + parsedData[trans].target : '') + "\n"
                ResResTR += "   " + parsedData[trans].description + "\n"
            }
        }
        else {
            if (parsedData[trans].togive) {
                resToGive += (trans + ": ")
                resToGive += parsedData[trans].title + "\n"
                resToGive += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " to " + parsedData[trans].target : '') + "\n"
                resToGive += "   " + parsedData[trans].description + "\n"
            }
            else {
                resToReceive += (trans + ": ")
                resToReceive += parsedData[trans].title + "\n"
                resToReceive += "   " + parsedData[trans].value + (parsedData[trans].target != '' ? " from " + parsedData[trans].target : '') + "\n"
                resToReceive += "   " + parsedData[trans].description + "\n"
            }
        }
    }

    if (options.list) {
        console.log("GIVE\n" + (resToGive == "" ? "Nothing to give" : resToGive))
        console.log("RECEIVE\n" + (resToReceive == "" ? "Nothing to receive" : resToReceive))
        if (options.showRes && (ResResTG != "" || ResResTR != "")) {
            console.log("\nRESOLVED:")
            console.log(ResResTG == "" ? "" : ("GIVE\n" + ResResTG))
            console.log(ResResTR == "" ? "" : ("RECEIVE\n" + ResResTR))
        }
    }
}
