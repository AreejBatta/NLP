import { isValidUrl } from "../client/js/nameChecker.js";

describe("linkValidity", ()=>{
    it('testing not valid url', ()=>{
        expect(isValidUrl('read')).notValid();
    });
    it('empty',()=>{
        expect(isValidUrl(' ')).notValid();
    })
})
