let math = String();
let result_area = document.getElementById("result_area");
const math_operators = ["+", "-", "*", "/"];

function button_operation(operation){
    if(operation == "."){
        if(!String(result_area.innerHTML.split(" ").slice(-1)).includes(".")){ //Only comma behind nummbers and only one comma per number
            if(is_number(math.slice(-1))){
                math += ".";
                result_area.innerHTML += convert_for_display(operation);
            } else {
                math += "0.";
                result_area.innerHTML += "0" + convert_for_display(operation);
            }
            return;
        } else {
            display_error();
            return;
        }
    } else if (operation == "(" && is_number(math.slice(-1))){ //Auto * before ()
        math += "*" + operation;
        result_area.innerHTML += convert_for_display("*") + convert_for_display(operation);
        return;
    } else if (is_number(operation) && math.slice(-1) == ")"){
        math += "*" + operation;
        result_area.innerHTML += convert_for_display("*") + convert_for_display(operation);
        return;
    } else if (operation == "power"){
        math += "**2"
        result_area.innerHTML += convert_for_display(operation);
        return;
    }

    if(!(math_operators.includes(operation) && math_operators.includes(math.slice(-1)))){
        math += operation;
        result_area.innerHTML += convert_for_display(operation);
    } else {
        math = math.slice(0, -2) + operation;
        result_area.innerHTML = result_area.innerHTML.slice(0, -3) + convert_for_display(operation);
    }
}

function convert_for_display(operation){
    if(operation == "+"){
        return " + ";
    } else if(operation == "-"){
        return " - ";
    } else if(operation == "*"){
        return " x ";
    } else if(operation == "/"){
        return " ÷ ";
    } else if(operation == "("){
        return " (";
    } else if(operation == ")"){
        return ") ";
    } else if (operation == "power"){
        return "²";
    } else {
        return operation;
    }
}

function clear_entry(){
    if(math.slice(-3, -1) == "**"){
        math = math.slice(0, -3);
        result_area.innerHTML = result_area.innerHTML.slice(0, -1);
    } else {
        math = math.slice(0, -1);
        if(result_area.innerHTML.endsWith(" ")){
            result_area.innerHTML = result_area.innerHTML.slice(0, -3);
        } else {
            result_area.innerHTML = result_area.innerHTML.slice(0, -1);
        }
    }
}

function delete_all(){
    math = String();
    result_area.innerHTML = String();
}

function display_error(){
    result_area.style.color = "red";
    setTimeout(() => {  result_area.style.color = "white";}, 300);
    console.log(math);
}

function calculate(){
    try {
        if(eval(math) != Infinity){
            console.log(math);
            math = String(eval(math));
            result_area.innerHTML = math;
        } else {
            display_error();
        }
    } catch (e){
        display_error();
    }
}

function is_number(v){
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return numbers.includes(v);
}