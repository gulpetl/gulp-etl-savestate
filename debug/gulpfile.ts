let gulp = require('gulp')
import {saveState} from '../src/plugin';
// let _etl = require('../src/plugin');

function runSaveState(callback: any) {
  let result
  result =
    gulp.src('../testdata/*.ndjson' )//,{ buffer: false }
    //USE_CASE-1
      .pipe(saveState({fileName:'../testdata/output/state1.json', saveInStream: true, bookmarkProp: 'Gin Bale Number', saveFrequency:2}))
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('../testdata/processed/Stream1'))

    //USE_CASE-2
      // .pipe(saveState({fileName:'../testdata/output/state2.json', saveInStream: false}))
      // .on('error', console.error.bind(console))
      // .pipe(gulp.dest('../testdata/processed/Stream2'))
      .on('end', function () {
        console.log('end')
        callback()
      })
      .on('error', function (err: any) {
        console.error(err)
        callback(err)
      })

  return result;
}

exports.default = gulp.series(runSaveState)