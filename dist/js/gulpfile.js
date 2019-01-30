"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let gulp = require('gulp');
const plugin_1 = require("./plugin");
function build_plumber(callback) {
    let result;
    result =
        gulp.src('../data/testdata/*') //,{ buffer: false }
            .pipe(plugin_1.saveState({ fileName: 'datadata/statestate.json' }))
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