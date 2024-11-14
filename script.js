/*
 result should be
    a. valid
      1 555-555-5555
      1 (555) 555-5555
      1(555)555-5555
      1 555 555 5555
      1 456 789 4444
      5555555555
      555-555-5555
      (555)555-5555      

    b.invalid
      555-5555
      555555
      1 555)555-5555 // not passed
      123**&!!asdf#
      55555555
      (6054756961)
      2 (757) 622-7382
      0 (757) 622-7382
      -1 (757) 622-7382
      2 757 622-7382
      10 (757) 622-7382
      27576227382
      (275)76227382
      2(757)6227382
      2(757)622-7382
      555)-555-5555
      (555-555-5555 // not passed
      (555)5(55?)-5555
      55 55-55-555-5
      11 555-555-5555
*/

// variables
const getInputValue = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultParagraph = document.getElementById("results-div");

// change result div
const makeResultText = (text, judge = "none") => judge === "none" ? resultParagraph.innerText = "" : resultParagraph.innerText = `${judge} US number: ${text}`;


//parse and evaluate
const parse = text => {      
    const invalidReason = []; // object to store invalid reasons

    //regex
    const availSignRegex = /[\)\(\s-]/g;
    
    //coverter
    const textToNums = text => text.replace(availSignRegex, "").split("").map(el => parseInt(el));    
    const textToArray = text => text.replace(/\s/g, "").split("");
    const spaceToUnder = text => text.replace(/\s/g,"_").split("");
    const indexToArray = (text, regex) => {
        const result = [];
        textToArray(text).map((el,index) => {
            if( regex.test(el) ){
                result.push(index)
                }
            });
        console.log(regex,result)
        console.log(regex, result.length)
        return result;
    };
    const illegalIndexLength = (text, regex, availindex) => {
        const indexNow = indexToArray(text,regex);
        console.log("indexnow", indexNow);
        console.log("availindex", availindex);
        const findIllegal = indexNow.filter(el => !availindex.includes(el));
        console.log(findIllegal);
        return findIllegal.length;
    }


    // checkLength  
    const test1 = text => {
        const numsArray = textToNums(text);        
        if (numsArray.length !== 11 && numsArray.length !== 10){
            invalidReason.push("lengthCheck_failed");
        }
    };

    // check invalid letter
    const test2 = text => {
        const numsArray = textToNums(text);        
        const isThereNan = numsArray.some((el) => Number.isNaN(el));        
        if (isThereNan){
            invalidReason.push("lettercheck_failed");
        }
    };

    //check country code when length is 11
    const test3 = text => {
        const numsArray = textToNums(text);
        if ( numsArray.length === 11 && numsArray[0] !== 1){
            invalidReason.push("countrycodecheck_failed");            
        };
    };    

    // check letter index
    // possible index for '(' = 0,1 
    // possible index for ')' = 4,5
    // possible index for '-' = 3,4,7,8
    // possible index for space = 1, 5, 7, 9
    
    // check "(", ")" index
    // 1. length of (, ) should be same
    // 2. each index of (, and ) should be in order, turn by turn... 
    // 3. but you have test 4,5, don't need to pass 2
 
    const test4 = text => {
        const availIndex = [0,1];
        const regex = /\(/;
        if (illegalIndexLength(text,regex,availIndex) > 0 ){
            invalidReason.push("signindexcheck_faild");
        };
    };

    const test5 = text => {
        const availIndex = [4,5];
        const regex = /\)/;
        if (illegalIndexLength(text,regex,availIndex) > 0 ){
            invalidReason.push("signindexcheck_faild");
        };
    };

    const test6 = text => {
        const availIndex = [3,4,7,8,9];
        const regex = /-/;
        if (illegalIndexLength(text,regex,availIndex) > 0 ){
            invalidReason.push("signindexcheck_faild");
        };
    };

    const test7 = text => {
        const availIndex = [1,5,7,9];
        const regex = /\_/;
        const testText = spaceToUnder(text).join("");
        if (illegalIndexLength(testText,regex,availIndex) > 0 ){
            invalidReason.push("signindexcheck_faild");
        };
    };

    const test8 = text => {
        const regex = /\)/;
        const regexPair = /\(/;
        if (indexToArray(text,regex) !== indexToArray(text,regexPair)){
            invalidReason.push("bracketpaircheck_faild");
        };
    };

    // make test object, do while loop, return judgement
    const tests = {
        test1,
        test2,
        test3,
        test4,
        test5,
        test6,
        test7
    };
    let testnumber = 1;
    while ( invalidReason.length < 1  ){
        console.log("testnumber", testnumber);
        tests[`test${testnumber}`](text);
        testnumber += 1;        
        if (testnumber > Object.keys(tests).length){
            break;
        };
    };

    return invalidReason.length === 0 ? "Valid" : "Invalid";
}


// get result
const getResult = text => {
    if ( text === ""){
        makeResultText(text);
    } else {
        makeResultText(text,parse(text));
    };        
};

// Button Event Listeners
checkBtn.addEventListener("click", () => {
    if (getInputValue.value === ""){
        alert("Please provide a phone number");
    }
    getResult(getInputValue.value);    
})

clearBtn.addEventListener("click", () => {
    getInputValue.value = "";    
    getResult(getInputValue.value);        
})