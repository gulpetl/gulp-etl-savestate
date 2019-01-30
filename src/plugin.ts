import PluginError = require('plugin-error');
import { writeFileSync, outputFileSync } from 'fs-extra';
import { handlelines } from 'gulp-etl-handlelines';

// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';

export function saveState(configObj: any) {

  let fileName = configObj.fileName ? configObj.fileName : 'state.json';
  let removeState = configObj.removeState ? configObj.removeState : false;

  const handleLine = (lineObj: object): object | null => {
    try {
      if (lineObj && (lineObj as any).type === 'STATE') {
        outputFileSync(fileName, JSON.stringify((lineObj as any).value));
        if (removeState == true) {
          return null;
        }
      }
    } catch (err) {
      throw new PluginError(PLUGIN_NAME, err);
    }
    return lineObj;
  }

  return handlelines(configObj, { transformCallback: handleLine });
}
