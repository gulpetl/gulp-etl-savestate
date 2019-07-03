import PluginError = require('plugin-error');
import { writeFileSync, outputFileSync } from 'fs-extra';
import { handlelines } from 'gulp-etl-handlelines';

// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';

function createStateRecord(recordObject:Object, streamName: string) : any {
  return {type:"STATE", stream: streamName, last_entry: recordObject}
}

function createRecord(recordObject:Object, streamName: string) : any {
  return {type:"RECORD", stream:streamName, record:recordObject}
}

//configObj {fileName?: string, removeState?: boolean}
export function saveState(configObj: {fileName?: string, removeState?: boolean, bookmarkProp: string, numOfRecords: number}) {

  let remove: boolean | undefined = ('removeState' in configObj) ? configObj.removeState : true;
  let file: string | null = configObj.fileName ? configObj.fileName : null;
  let recordnum = 0
  let bookmarkIndex:any = -1
  const handleLine = (lineObj: object): object | null => {
    try {
      
      if (lineObj && (lineObj as any).type === 'RECORD') { 
        if(recordnum % configObj.numOfRecords == 0) {
          if(file !== null){
            let BookmarkProp = configObj.bookmarkProp
            let Obj:Object = (lineObj as any).record
            for(var i = 0; i < Object.keys(Obj).length; i++) {
                if(Object.keys(Obj)[i] == BookmarkProp) {
                  bookmarkIndex = i
                }
            }
            let latestState:any = Object.entries(Obj)[bookmarkIndex][1]
            outputFileSync(file, JSON.stringify(createStateRecord(latestState,'LastStateRecord')))
          
          }
        }
        recordnum++
      }
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
