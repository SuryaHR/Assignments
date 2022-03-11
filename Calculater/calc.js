let opperations = ["+", "-", "*", "/", "="]
let result = 0;
let number = "";
let operator = "";
let prevRes = 0;

function clickHandler(event){
    
    let input = event.target.value+"";
    
    if(!opperations.includes(input)){
        if(input == "back"){
            number = number.substring(0,number.length-1);
        }else if(input == "reset"){
            number = "";
            operator = "";
            document.getElementById("operator").innerText = operator;
        }else{
            number += input;
        }
        document.getElementById("display").innerText = number;
    }else{
        if(result == 0){
            if(number.length > 0)
                result += +number;
            else
                result += prevRes;
            document.getElementById("display").innerText = result;
        }else{
            if(operator == "+"){
                result += +number;
            }else if(operator == "-"){
                result -= +number;
            }else if(operator == "*"){
                result *= +number;
            }else if(operator == "/"){
                result /= +number;
            }

            document.getElementById("display").innerText = result;
        }

        operator = input;
        document.getElementById("operator").innerText = operator;
        number = "";

        if(operator == "="){
            prevRes = result;
            result = 0;
        }
    }
}