"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PluginError = require("plugin-error");
const fs_extra_1 = require("fs-extra");
const gulp_etl_handlelines_1 = require("gulp-etl-handlelines");
require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;
function createStateRecord(recordObject) {
    return { type: "STATE", last_entry: recordObject };
}
//configObj {fileName?: string, removeState?: boolean}
function saveState(configObj) {
    let saveInStream = (configObj.saveInStream !== null) ? configObj.saveInStream : true;
    let file = configObj.fileName ? configObj.fileName : '../state.json';
    let bookmarkProp = configObj.bookmarkProp ? configObj.bookmarkProp : null;
    let saveFrequency = configObj.saveFrequency ? configObj.saveFrequency : 1000;
    let recordnum = -1;
    let lastObject;
    const handleLine = (lineObj) => {
        try {
            if (lineObj && lineObj.type === 'RECORD') {
                if (bookmarkProp) {
                    lastObject = lineObj;
                    recordnum++;
                    if (recordnum % saveFrequency == 0) {
                        if (file !== null) {
                            let latestState = lineObj.record[bookmarkProp];
                            fs_extra_1.outputFileSync(file, JSON.stringify(createStateRecord(latestState)));
                        }
                        if (saveInStream == true) {
                            let latestState = lineObj.record[bookmarkProp];
                            return [createStateRecord(latestState), lineObj];
                        }
                    }
                }
            }
            else if (lineObj && lineObj.type === "STATE") {
                if (file !== null) {
                    fs_extra_1.outputFileSync(file, JSON.stringify(lineObj.value));
                }
                if (saveInStream === false) {
                    return null;
                }
            }
        }
        catch (err) {
            throw new PluginError(PLUGIN_NAME, err);
        }
        return lineObj;
    };
    function endReached() {
        let saveObject = lastObject;
        if (configObj.fileName && configObj.bookmarkProp) {
            let latestState = saveObject.record[configObj.bookmarkProp];
            fs_extra_1.outputFileSync(configObj.fileName, JSON.stringify(createStateRecord(latestState)));
        }
    }
    return gulp_etl_handlelines_1.handlelines(configObj, { transformCallback: handleLine, finishCallback: endReached });
}
exports.saveState = saveState;
//# sourceMappingURL=plugin.js.map