var value = 0;

function tickUp() 
{
    let counterSpan = document.getElementById("counter");
    value += 1;
    counterSpan.innerText = value;
}

function tickDown() 
{
    let counterSpan = document.getElementById("counter");
    counterSpan.innerText = value - 1;
}


function runForLoop() 
{
    let loopResult = document.getElementById("forLoopResult");

    let result = "";
    for (let i = 0; i <= value; i++) 
    {
        result += i + " ";
    }
    loopResult.innerText = result;
}

function showOddNumbers() 
{
    let loopResult = document.getElementById("oddNumberResult");

    let result = "";
    for (let i = 0; i <= value; i++) 
    {
        if (i % 2 != 0)
        {
            result += i + " ";
        }
    loopResult.innerText = result;
    }
}


function addMultiplesToArray() 
{
    let array = [];
    for (let i = value; i >= 0; i--) 
    {
        if (i % 5 == 0)
        {
            array.push(i)
        }
    }
    console.log(array);
}