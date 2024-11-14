/*
Todos

1. declare variables to get input value, add event listener, change inner text of result div (done)
2. add event listener to two buttons(done)
3. when checkbtn clicked
   a. if there is no value, display "you should input a telephone number"
   b. if ther is value, parse value -> evaluate value -> display result (valid / invalid)

4. result should be
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
const resultParagraph = document.getElementById("result_p")


// change result div
const makeResultText = (text, judge = "none") => judge === "none" ? resultParagraph.innerText = "" : resultParagraph.innerText = `${judge} US number: ${text}`;

// evaluate

//parser
const parse = text => {  
    
    const invalidReason = []; // object to store invalid reasons

    //regex
    const availSignRegex = /[\)\(\s-]/g;
    
    //coverter
    const textToNums = text => text.replace(availSignRegex, "").split("").map(el => parseInt(el));    


    // now evaluate
    /*
    like this?
    const test1 = (){};
    const test2 = (){};
    const test3 = (){};
    const tests = { test1, test2, test3, test4...};
    let testnumber = 1;
    
    invalidReason.length === 0 ? makeResultText(text, "Valid") : makeResultText(text, "invalid")
    */

    // checkLength  
    const test1 = text => {
        const numsArray = textToNums(text);
        console.log(numsArray.length);
        if (numsArray.length !== 11 && numsArray.length !== 10){
            invalidReason.push("lengthCheck_failed");
        }
    }    
    // check invalid letter
    const test2 = text => {
        const numsArray = textToNums(text);
        console.log(numsArray);
        const isThereNan = numsArray.some((el) => Number.isNaN(el));        
        if (isThereNan){
            invalidReason.push("lettercheck_failed");
        }
    }

    // check letter index
    // possible index for '(' = 0,2 
    // possible index for ')' = 4,5
    // possible index for '-' = 3,4,7,8
    // possible index for space = 1, 5, 7, 9

    const tests = {
        test1,
        test2
    };
    
    let testnumber = 1;
    while ( testnumber <= Object.keys(tests).length ){
        tests[`test${testnumber}`](text);
        testnumber += 1;        
        console.log("testlength", Object.keys(tests).length);
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