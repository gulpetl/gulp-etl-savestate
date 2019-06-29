let gulp = require('gulp')
import {saveState} from '../src/plugin';
// let _etl = require('../src/plugin');

function runSaveState(callback: any) {
  let result
  result =
    gulp.src('../testdata/*.ndjson' )//,{ buffer: false }
      .pipe(saveState({fileName:'../testdata/output/state.json', removeState:true}))
       .on('error', console.error.bind(console))
      .pipe(gulp.dest('../testdata/processed'))
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