"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginError = require("plugin-error");
const fs_extra_1 = require("fs-extra");
const gulp_etl_handlelines_1 = require("gulp-etl-handlelines");
// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';
function saveState(configObj) {
    let fileName = configObj.fileName ? configObj.fileName : 'state.json';
    let removeState = configObj.removeState ? configObj.removeState : false;
    const handleLine = (lineObj) => {
        try {
            if (lineObj && lineObj.type === 'STATE') {
                fs_extra_1.outputFileSync(fileName, JSON.stringify(lineObj.value));
                if (removeState == true) {
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