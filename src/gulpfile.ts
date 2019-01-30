let gulp = require('gulp')
import {saveState} from './plugin';

function build_plumber(callback: any) {
  let result
  result =
    gulp.src('../data/testdata/*' )//,{ buffer: false }
      .pipe(saveState({fileName:'datadata/statestate.json'}))
       .on('error', console.error.bind(console))
      .pipe(gulp.dest('../data/output/processed'))
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

exports.default = gulp.series(build_plumber)