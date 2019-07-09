import PluginError = require('plugin-error');
import { writeFileSync, outputFileSync } from 'fs-extra';
import { handlelines } from 'gulp-etl-handlelines';

// consts
const PLUGIN_NAME = 'gulp-datatube-saveState';

function createStateRecord(recordObject:Object) : Object {
  return {type:"STATE", last_entry: recordObject}
}

//configObj {fileName?: string, removeState?: boolean}
export function saveState(configObj: {fileName?: string, saveInStream?: boolean, bookmarkProp?: string, saveFrequency?: number}) {

  let saveInStream: boolean | undefined = (configObj.saveInStream !== null)? configObj.saveInStream : true;
  let file: string | null = configObj.fileName ? configObj.fileName : '../state.json';
  let bookmarkProp: string | null = configObj.bookmarkProp ? configObj.bookmarkProp : null;
  let saveFrequency: number = configObj.saveFrequency ? configObj.saveFrequency : 1000;
  let recordnum = -1
  let lastObject:any

  const handleLine = (lineObj: object): object | null => {
    
    try {     
        if (lineObj && (lineObj as any).type === 'RECORD') { 
          
          if(bookmarkProp) {

            lastObject = lineObj
            recordnum++

            if(recordnum % saveFrequency == 0) {
  
              if(file !== null){
                let latestState = (lineObj as any).record[bookmarkProp]
                outputFileSync(file, JSON.stringify(createStateRecord(latestState)))
              }

              if (saveInStream == true) {
                let latestState = (lineObj as any).record[bookmarkProp]
                return createStateRecord(latestState)
              }
  
            }
  
          }
  
        }
  
        else if (lineObj && (lineObj as any).type === "STATE") {
  
          if(file !== null){
            outputFileSync(file, JSON.stringify((lineObj as any).value));
          }
  
          if (saveInStream === false) {
            return null;
          }
  
        }
          
    } catch (err) {
      throw new PluginError(PLUGIN_NAME, err);
    }
    
    return lineObj;
  }

  function endReached () {
    let saveObject = lastObject
    if(configObj.fileName && configObj.bookmarkProp) {
      let latestState = (saveObject as any).record[configObj.bookmarkProp]
      outputFileSync(configObj.fileName, JSON.stringify(createStateRecord(latestState)))
    }
    
  } 


  return handlelines(configObj, {transformCallback: handleLine, finishCallback: endReached});
}
