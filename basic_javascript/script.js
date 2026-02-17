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
    value -= 1;
    counterSpan.innerText = value;
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
        if (i % 5 == 0 && i != 0)
        {
            array.push(i)
        }
    }
    console.log(array);
}


function printCarObject()
{
    let type = document.getElementById("carType").value;
    let mpg = document.getElementById("carMPG").value;
    let color = document.getElementById("carColor").value;  

    const car = new Car(type, mpg, color)



    console.log(car);
}

class Car{

    constructor (type, mpg, color)
    {
        this.cType = type;
        this.cMPG = mpg;
        this.cColor = color;    
    }

}


function loadCar(carNumber)
{
    const cars = [carObject1, carObject2, carObject3];
    const car = cars[carNumber - 1];

    document.getElementById("carType").value = car.cType;
    document.getElementById("carMPG").value = car.cMPG;
    document.getElementById("carColor").value = car.cColor;
}

function changeColor(carNumber)
{
    const cars = [carObject1, carObject2, carObject3];
    const car = cars[carNumber - 1];


    document.getElementById("styleParagraph").style.color = car.cColor;


}