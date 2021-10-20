import arg from 'arg'
import * as main from './main'
function parseArgsToOptions(rowArgs) {
    const args = arg(
        {
            '--help': Boolean,
            '--resolve': Number,
            '--togive': Number,
            '--toreceive': Number,
            '--target': String,
            '--description': String,
            '--importance': Number,
            '--delete': Number,
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

    resObj.help = args['--help'] ? true : false;

    if (args['--resolve']) {
        resObj.resolve = Number(args['--resolve'])
        return resObj
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

    let options = parseArgsToOptions(args)

    if (options.help) {
        console.log('Help message')
    }

    if (options.error.includes('missing')) {

    }
    else {

        if (options.hasOwnProperty('togive'))
            main.toGive(options)


    }
    console.log(options)


}