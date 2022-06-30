let result_area = document.getElementById("result_area");
let math = [];
const basic_operators = ["+", "-", "*", "/"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function button_operation(operation){
    if(basic_operators.includes(operation) && basic_operators.includes(math[math.length -1])){
        clear_entry();   //clear result_area's last element
        result_area.innerHTML += translate_for_display(operation);
        math[math.length -1] = operation;
        return;
    }

    if(operation == "."){
        if(!(numbers.includes(math[math.length -1]) || math[math.length -1] == ".")){   //If last input is no number or comma
            math.push("0", ".");
            result_area.innerHTML += "0" + translate_for_display(".");
        } else {
            if(!(comma_number())){  //if it's no comma number
                math.push(".");
                result_area.innerHTML += translate_for_display(".");
            } else {
                display_error();
            }
        }
        return;
    }

    result_area.innerHTML += translate_for_display(operation);
    math.push(operation);
}

function translate_for_display(operation){
    if (["+", "-", "*", "/"].includes(operation)){   //Return math operator with space around
        if (operation == "*"){ operation = "x";}
        if (operation == "/"){ operation = "÷";}
        return " " + operation + " ";
    } else {
        return operation;
    }
}

function clear_entry(){
    result_area.innerHTML = result_area.innerHTML.slice(0, result_area.innerHTML.length - translate_for_display(math[math.length -1]).length);
    math.pop();
}

function delete_all(){
    math = [];
    result_area.innerHTML = String();
}

function calculate(){
    try {
        math = eval(math.join(""));
        result_area.innerHTML = math;
    } catch(e) {
        console.log(math);
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
    after_comma.forEach(element => {
        if(!(numbers.includes(element))){
            return false;
        }
    });
    return true;
}