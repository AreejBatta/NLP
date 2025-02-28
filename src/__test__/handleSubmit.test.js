import { handleSubmit } from "../client/js/formHandler.js";

describe("is sub ok", ()=>{
    it ("submits?", ()=>{
        expect (handleSubmit).toBeDefined();
    })
})