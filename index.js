var fs        = require('fs')
  , path      = require('path')
  , osenv     = require('osenv')
  , concat    = require('concat-stream')
  , spawn     = require('cross-spawn')
  , duplexify = require('duplexify')

module.exports = function (opts) {
  var tmp = path.join(osenv.tmpdir(), '_'+Date.now())

  if (opts && opts.format) tmp+= '.'+opts.format

  var writer = fs.createWriteStream(tmp)
  
  writer.on('close', function () {
    var script = path.resolve(__dirname, 'stream.php')    
      , child = spawn('php', [script, tmp])

    duplex.setReadable(child.stdout)

    child.on('exit', function(code, sig) {
      fs.unlink(tmp, function(){});

      if(code === null || code !== 0) {
        child.stderr.pipe(concat(function(errstr) {
          duplex.emit('error', new Error(errstr))
        }))
      }
    })
  })

  var duplex = duplexify(writer)
  return duplex;
}

if(!module.parent) {
  process.stdin.pipe(module.exports()).pipe(process.stdout)
}
