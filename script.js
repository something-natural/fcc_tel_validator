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
      1 555)555-5555
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
      (555-555-5555
      (555)5(55?)-5555
      55 55-55-555-5
      11 555-555-5555
*/

// variables
const getInputValue = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultParagraph = document.getElementById("result_p");

// change result div
const makeResultText = (text, judge = "none") => judge === "none" ? resultParagraph.innerText = "" : resultParagraph.innerText = `${judge} US number: ${text}`;


//parser
const parse = text => {      
    const invalidReason = []; // object to store invalid reasons

    //regex
    const availSignRegex = /[\)\(\s-]/g;
    
    //coverter
    const textToNums = text => text.replace(availSignRegex, "").split("").map(el => parseInt(el));    

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
    // possible index for '(' = 0,2 
    // possible index for ')' = 4,5
    // possible index for '-' = 3,4,7,8
    // possible index for space = 1, 5, 7, 9
    
    const test4 = text => {
        console.log("test4")        ;
    }

    const tests = {
        test1,
        test2,
        test3
    };
    
    let testnumber = 1;
    while ( testnumber <= Object.keys(tests).length ){
        tests[`test${testnumber}`](text);
        testnumber += 1;                
    }    

    return invalidReason.length === 0 ? "Valid" : "Invalid"
}


const getResult = text => {
    if ( text === ""){
        makeResultText(text);
    } else {
        makeResultText(text,parse(text));
    }
        
}

// Button Event Listeners
checkBtn.addEventListener("click", () => {
    getResult(getInputValue.value);    
})

clearBtn.addEventListener("click", () => {
    getInputValue.value = "";    
    getResult(getInputValue.value);        
})