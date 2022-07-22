let result_area = document.getElementById("result_area");
let math = [];
const basic_operators = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let displays_result = false;
let ans = 0;

function button_operation(operation){
    if(displays_result && !(basic_operators.includes(operation))){
        delete_all();
    }
    displays_result = false;

    if([")", "ans", "pi"].includes(math[math.length -1]) && (!basic_operators.includes(operation) || operation == "ans")){
        math.push("*");
        result_area.innerHTML += translate_for_display("*");
    }

    if(["(", "ans", "square_root", "pi"].includes(operation) && numbers.includes(math[math.length -1])){
        math.push("*");
        result_area.innerHTML += translate_for_display("*");
    }

    if(basic_operators.includes(operation) && basic_operators.includes(math[math.length -1])){   //No basic operators behind each other
        clear_entry();   //clear result_area's last element
        result_area.innerHTML += translate_for_display(operation);
        math[math.length] = operation;
        return;
    }

    if(operation == "."){
        if(!(numbers.includes(math[math.length -1]) || math[math.length -1] == ".")){   //If last input isn't a number or a comma add 0 before comma
            math.push("0");
            result_area.innerHTML += translate_for_display("0");
        } else {
            if(comma_number()){  //if it's no comma number
                display_error();
                return;
            }
        }
    }

    result_area.innerHTML += translate_for_display(operation);
    console.log(operation);
    math.push(operation);
}

function translate_for_display(operation){
    if (["+", "-", "*", "/", "ans"].includes(operation)){   //Return math operator with space around
        if (operation == "*") operation = "x";
        if (operation == "/") operation = "÷";
        if (operation == "ans") operation = "Ans";
        return " " + operation + " ";
    }
        if (operation == "square_root") operation = "√";
        if (operation == "pi") operation = "Π";
        return operation;
}

function clear_entry(){
    try {
        result_area.innerHTML = result_area.innerHTML.slice(0, result_area.innerHTML.length - translate_for_display(math[math.length -1]).length);
        math.pop();
    } catch(e){
        return;
    }
}

function delete_all(){
    math = [];
    result_area.innerHTML = String();
}

function calculate(){
    // console.log(`math type: ${typeof math}\nmath value: ${math}`);
    try {
        math = translate_for_calculate(math);
        console.log(`math type: ${typeof math}\nmath value: ${math}\nmath as string: ${math.join("")}`);
        math = String(eval(math.join("")));
        math = [math];
        result_area.innerHTML = math[0];
        ans = math[0];
        displays_result = true;
    } catch(e) {
        display_error();
    }

}

function display_error(){
    result_area.style.color = "red";
    result_area.style.fontWeight = 700;
    setTimeout(() => { result_area.style.color = "white"; result_area.style.fontWeight = 500;}, 300)
}

function comma_number(){   //If the current number includes a comma true will be returned else false
    let last_comma = math.lastIndexOf(".");
    if(last_comma == -1){
        return false;
    }
    let after_comma = math.slice(last_comma + 1);
    let is_comma_number = true;
    after_comma.forEach(element => {
        if(!(numbers.includes(element))){
            is_comma_number = false;
        }
    });
    if(!(is_comma_number)){
        return false;
    }
    return true;
}

function translate_for_calculate(math_array){
    math_array.forEach((value, index) => {
        if(value == "ans") math_array[index] = ans;
        if(value == "square_root") math_array[index] = "0.5**";
        if(value == "pi") math_array[index] = Math.PI;
    });
    return math_array;
}