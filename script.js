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
const showResult = (text, judge) => resultParagraph.innerText = `${judge} US number: ${text}`;
const eraseResult = () => resultParagraph.innerText = "";

//parser
const parse = text => {
    // you should accep               t (,), space(replace to underbar), dash only
    // possible index for '(' = 0,2 
    // possible index for ')' = 4,5
    // possible index for '-' = 3,4,7,8
    // possible index for space = 1, 5, 7, 9
    
    
        
    //regex
    const availSignRegex = /[\)\(\s-]/g;
        
    //evaluate
    // 1. check whether unavailable sign used or not
    const someNaN = nums => nums.some(el => Number.isNaN(el)); // don't use typeof(el) === "number", because typeof NaN is number!
    

    //result msg    
    

    //parse
    const textToNums = text.replace(availSignRegex, "").split("").map(el => parseInt(el));
    console.log(textToNums);    
    
    return someNaN(textToNums) ? showResult(text,"Invalid") : showResult(text,"Valid");
        
}





// Button Event Listeners
checkBtn.addEventListener("click", () => {
    parse(getInputValue.value);    
})

clearBtn.addEventListener("click", () => {
    getInputValue.value = "";    
    eraseResult();
})