import arg from 'arg'

function parseArgsToOptions(rowArgs) {
    const args = arg(
        {
            '--resolve': Number,
            '--togive': Number,
            '--toreceive': Number,
            '--title': String,
            '--target': String,
            '--description': String,
            '--importance': Number,
            '--delete': Number,
            '-r': '--resolve',
            '-g': '--togive',
            '-r': '--toreceive',
            '-t': '--title',
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

    if (args['--resolve']) {
        resObj.resolve = Number(args['--resolve'])
        return resObj
    }
    if (args['--delete']) {
        resObj.delete = Number(args['--delete'])
        return resObj
    }


    if (args['--title']) {
        resObj.title = args['--title']
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


    return resObj
}

export function cli(args) {
    // console.log(args)

    let options = parseArgsToOptions(args)

    console.log(options)
}