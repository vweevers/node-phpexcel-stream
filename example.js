var excel      = require('./')
  , fs         = require('fs')
  , csvParser  = require('csv-parser')
  , JSONStream = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( excel() )
  .pipe( csvParser() )
  .pipe( JSONStream.stringify() )
  .pipe( process.stdout )
