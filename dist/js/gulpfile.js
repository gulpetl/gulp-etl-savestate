"use strict";
let gulp = require('gulp');
// import {saveState} from './plugin';
let _etl = require('./plugin');
function build_plumber(callback) {
    let result;
    result =
        gulp.src('../data/testdata/*') //,{ buffer: false }
            .pipe(_etl.saveState({ fileName: 'state.json', removeState: false }))
            .on('error', console.error.bind(console))
            .pipe(gulp.dest('../data/output/processed'))
            .on('end', function () {
            console.log('end');
            callback();
        })
            .on('error', function (err) {
            console.error(err);
            callback(err);
        });
    return result;
}
exports.default = gulp.series(build_plumber);
//# sourceMappingURL=gulpfile.js.map