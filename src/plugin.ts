import PluginError = require('plugin-error');
import { writeFileSync, outputFileSync } from 'fs-extra';
import { handlelines } from 'gulp-etl-handlelines';

// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';

export function saveState(configObj: {fileName?: string, removeState?: boolean}) {

  let remove: boolean | undefined = ('removeState' in configObj) ? configObj.removeState : true;
  let file: string | null = configObj.fileName ? configObj.fileName : null;
  
  const handleLine = (lineObj: object): object | null => {
    try {
      if (lineObj && (lineObj as any).type === 'STATE') {
        if(file !== null){
          outputFileSync(file, JSON.stringify((lineObj as any).value));
        }
        if (remove == true) {
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
