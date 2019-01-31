"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginError = require("plugin-error");
const fs_extra_1 = require("fs-extra");
const gulp_etl_handlelines_1 = require("gulp-etl-handlelines");
// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';
function saveState(configObj) {
    let remove = ('removeState' in configObj) ? configObj.removeState : true;
    let file = configObj.fileName ? configObj.fileName : null;
    const handleLine = (lineObj) => {
        try {
            if (lineObj && lineObj.type === 'STATE') {
                if (file !== null) {
                    fs_extra_1.outputFileSync(file, JSON.stringify(lineObj.value));
                }
                if (remove == true) {
                    return null;
                }
            }
        }
        catch (err) {
            throw new PluginError(PLUGIN_NAME, err);
        }
        return lineObj;
    };
    return gulp_etl_handlelines_1.handlelines(configObj, { transformCallback: handleLine });
}
exports.saveState = saveState;
//# sourceMappingURL=plugin.js.map