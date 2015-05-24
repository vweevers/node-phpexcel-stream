# phpexcel-stream

> Memory-efficient spreadsheet to CSV converter

[![npm status](http://img.shields.io/npm/v/phpexcel-stream.svg?style=flat-square)](https://www.npmjs.org/package/phpexcel-stream) [![Travis build status](https://img.shields.io/travis/vweevers/phpexcel-stream.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/phpexcel-stream) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/phpexcel-stream.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/phpexcel-stream) [![Dependency status](https://img.shields.io/david/vweevers/phpexcel-stream.svg?style=flat-square)](https://david-dm.org/vweevers/phpexcel-stream)

## example

```js
var excel      = require('phpexcel-stream')
  , fs         = require('fs')
  , csvParser  = require('csv-parser')
  , JSONStream = require('jsonstream')

fs.createReadStream('air_pollution_nl.xlsx')
  .pipe( excel() )
  .pipe( csvParser() )
  .pipe( JSONStream.stringify() )
  .pipe( process.stdout )
```

## `excel([extension])`

Returns a duplex stream - give it a spreadsheet, get back CSV. Optionally pass `extension` as a file format hint to PHPExcel (format is autodetected otherwise).

## Supported file formats (by PHPExcel)

- Office Open XML (.xlsx) Excel 2007 and above
- SpreadsheetML (.xml) Excel 2003
- BIFF 5-8 (.xls) Excel 95 and above
- Open Document Format/OASIS (.ods)
- Gnumeric (GNOME)
- HTML (why)
- SYLK (no idea)
- CSV (but you can and should use [csv-parser](npmjs.com/package/csv-parser) in node)

## Requirements

- PHP >= 5.2.0, must be available in `PATH`
- [composer](https://getcomposer.org), must be available in `PATH`
- PHP extensions: `sqlite3` (used for caching), `zip` (required for xlsx, ods or gnumeric files) and `xml`

## install

With [npm](https://npmjs.org) do:

```
npm install phpexcel-stream
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl). Test data © Statistics Netherlands, The Hague/Heerlen.
