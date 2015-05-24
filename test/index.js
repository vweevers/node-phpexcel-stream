var test       = require('tape')
  , excel      = require('../')
  , fs         = require('fs')
  , csvParser  = require('csv-parser')
  , concat     = require('concat-stream')

test('functional', function(t){
  t.plan(1)

  var file = require.resolve('./air_pollution_nl.xlsx')
  var expected = require('./air_pollution_nl.json')

  fs.createReadStream(file)
    .pipe( excel() )
    .pipe( csvParser() )
    .pipe( concat(function(data){
      t.deepEquals(data, expected)
    }))
})
