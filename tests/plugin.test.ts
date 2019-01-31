import { saveState } from '../src/plugin';
const from = require('from2');
const Vinyl = require('vinyl');
import {readFileSync} from 'fs-extra';


describe('plugin tests', () => {

    describe('Vinyl file as Buffer', () => {

        test('basic functionality no options, STATE message removed and no state file saved', (done) => {
            let fakeFile = new Vinyl({
                contents: Buffer.from('{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}')
            })
    
            from.obj([fakeFile]).pipe(saveState({}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isBuffer()).toBeTruthy()
                    expect(file.contents.toString()).toBe('{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                    done();
                })
        });
        
        test('removeState option false, STATE message should NOT be removed and no state file saved', (done) => {
            let fakeFile = new Vinyl({
                contents: Buffer.from('{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}')
            })
    
            from.obj([fakeFile]).pipe(saveState({removeState:false}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isBuffer()).toBeTruthy()
                    expect(file.contents.toString()).toBe('{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                    done();
                })
        });

        test('file path for state passed in, STATE message should be removed and should save state to passed in path', (done) => {
            let fakeFile = new Vinyl({
                contents: Buffer.from('{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}')
            })
    
            from.obj([fakeFile]).pipe(saveState({fileName:'tests/data/state.json'}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isBuffer()).toBeTruthy()
                    expect(file.contents.toString()).toBe('{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                    let savedState = readFileSync('tests/data/state.json').toString()
                    expect(savedState).toBe('{}')
                    done();
                })
        });

        test('empty file, should get empty file', (done) => {
            let fakeFile = new Vinyl({
                contents: Buffer.from('')
            })
            from.obj([fakeFile]).pipe(saveState({}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isBuffer()).toBeTruthy()
                    expect(file.contents.toString()).toBe('')
                    done();
                })
        });

    })


    describe('Vinyl file as Stream', () => {

        test('basic functionality no options, STATE message removed and no state file saved', (done) => {
            let fakeFile = new Vinyl({
                contents: from(['{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}'])
            })
            let result: string = '';
            from.obj([fakeFile]).pipe(saveState({}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isStream()).toBeTruthy()
                    file.contents.on('data', function (chunk: any) {
                        result += chunk;
                    })
                    file.contents.on('end', function(){
                        expect(result).toBe('{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                        done();
                    })
                })
        });

        test('removeState option false, STATE message should NOT be removed and no state file saved', (done) => {
            let fakeFile = new Vinyl({
                contents: from(['{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}'])
            })
            let result: string = '';
            from.obj([fakeFile]).pipe(saveState({removeState:false}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isStream()).toBeTruthy()
                    file.contents.on('data', function (chunk: any) {
                        result += chunk;
                    })
                    file.contents.on('end', function(){
                        expect(result).toBe('{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                        done();
                    })
                })
        });

        test('file path for state passed in, STATE message should be removed and should save state to passed in path', (done) => {
            let fakeFile = new Vinyl({
                contents: from(['{"type":"STATE","value":{}}\n{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}'])
            })
            let result: string = '';
            from.obj([fakeFile]).pipe(saveState({fileName:'tests/data/state.json'}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isStream()).toBeTruthy()
                    file.contents.on('data', function (chunk: any) {
                        result += chunk;
                    })
                    file.contents.on('end', function(){
                        expect(result).toBe('{"type":"RECORD"}\n{"type":"RECORD"}\n{"type":"RECORD"}\n')
                        let savedState = readFileSync('tests/data/state.json').toString()
                        expect(savedState).toBe('{}')
                        done();
                    })
                })
        });
        test('empty file, should get empty file', (done) => {
            let fakeFile = new Vinyl({
                contents: from([''])
            })
            let result: string = '';
            from.obj([fakeFile]).pipe(saveState({}))
                .once('data', function (file: any) {
                    expect(Vinyl.isVinyl(file)).toBeTruthy()
                    expect(file.isStream()).toBeTruthy()
                    file.contents.on('data', function (chunk: any) {
                        result += chunk;
                    })
                    file.contents.on('end', function(){
                        expect(result).toBe('')
                        done();
                    })
                })
        });
    })

});