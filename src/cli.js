import arg from 'arg'
import * as main from './main'
import fs from 'fs'

function parseArgsToOptions(rowArgs) {
    const args = arg(
        {
            '--help': Boolean,
            '--list': Boolean,
            '--showResolved': Boolean,
            '--resolve': Number,
            '--togive': Number,
            '--toreceive': Number,
            '--target': String,
            '--description': String,
            '--importance': Number,
            '--delete': Number,
            '--showres': '--showResolved',
            '--sr': '--showResolved',
            '-l': '--list',
            '-R': '--resolve',
            '-g': '--togive',
            '-r': '--toreceive',
            '-T': '--target',
            '-d': '--description',
            '-i': '--importance',
            '-D': '--delete',
        },
        {
            argv: rowArgs.slice(2),
        }
    )

    let resObj = {
        error: ''
    }

    resObj.help = args['--help'] ? true : false
    resObj.list = args['--list'] ? true : false
    resObj.showRes = args['--showResolved'] ? true : false

    if (args['--resolve'] != undefined) {
        resObj.resolve = Number(args['--resolve'])
    }
    else {
        resObj.resolve = -1
    }
    if (args['--delete']) {
        resObj.delete = Number(args['--delete'])
        return resObj
    }


    if (args._[0]) {
        resObj.title = args._[0]
    }
    else {
        resObj.title = ''
        resObj.error += "missing-title"
    }

    resObj.description = args['--description'] ? args['--description'] : ''
    resObj.target = args['--target'] ? args['--target'] : ''
    resObj.importance = ''
    if (args['--importance'] && Number(args['--importance']) >= 1 && Number(args['--importance']) <= 3) {
        for (let i = 0; i < Number(args['--importance']); i++) {
            resObj.importance += '!'
        }
    }

    if (args['--togive']) {
        resObj.togive = Number(args['--togive'])
    }
    else if (args['--toreceive']) {
        resObj.toreceive = Number(args['--toreceive'])
    }
    else {
        resObj.error += "missing-value"
    }

    if (!resObj.help && resObj.error.includes('missing') && (resObj.error.includes('title') || resObj.error.includes('value')))
        resObj.list = true
    else
        resObj.list = false

    return resObj
}

export function cli(args) {
    // console.log(args)

    const { exec } = require('child_process')
    const homedir = require('os').homedir();
    const filePath = `${homedir}/.money-track.json`
    if (!fs.existsSync(filePath)) {
        exec(`echo '{}' > ${filePath}`)
    }

    let options = parseArgsToOptions(args)
    // console.log(options)

    if (options.resolve != -1) {
        main.resolve(options)
        return
    }

    if (options.help && !options.list) {
        console.log('Help message')
        return
    }

    if (options.error.includes('missing') || options.list) {
        main.list(options)
        return
    }
    else {
        if (options.hasOwnProperty('togive'))
            main.toGive(options)
        if (options.hasOwnProperty('toreceive'))
            main.toReceive(options)

        return
    }
}