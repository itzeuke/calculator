let result_area = document.getElementById("result_area");
let math = [];
const basic_operators = ["+", "-", "*", "/"];
let displays_result = false;
let ans = 0;

function button_operation(operation){
    //Delete displayed result if you dont use a math operator
    if(displays_result && !(basic_operators.includes(operation) || ["square_root", "power"].includes(operation))){
        delete_all();
    }

    displays_result = false;

    // if(["square_root", "power"].includes(operation)){
    //     math.push("ans");
    //     result_area.innerHTML += translate_for_display("ans");
    // }

    if(element_needs_operator(operation)){
        math.push("*");
        result_area.innerHTML += translate_for_display("*");
    }

    if(basic_operators_behind_each_other(operation)){
        clear_entry();   //clear result_area's last element
        result_area.innerHTML += translate_for_display(operation);
        math[math.length] = operation;
        return;
    }

    if(operation == "."){
        if(auto_zero_before_comma()){
            math.push("0");
            result_area.innerHTML += translate_for_display("0");
        } else {
            if(is_comma_number()){
                display_error();
                return;
            }
        }
    }

    result_area.innerHTML += translate_for_display(operation);
    math.push(operation);
    debug();
}

function translate_for_display(operation){
    if (["+", "-", "*", "/", "ans"].includes(operation)){   //Return math operator with space around
        if (operation == "*") operation = "x";
        if (operation == "/") operation = "÷";
        if (operation == "ans") operation = "Ans";
        return " " + operation + " ";
    }
        if (operation == "square_root") operation = "<p class='sup'>0.5</p>";
        if (operation == "power") operation = "<p class='sup'>2</p>";
        if (operation == "pi") operation = "Π";
        return operation;
}

function clear_entry(){
    try {
        result_area.innerHTML = result_area.innerHTML.slice(0, result_area.innerHTML.length - translate_for_display(last_math_element()).length);   //Delete last result_area element
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
    try {
        debug();
        math = translate_for_calculate(math);
        math = math.join("");
        math = [String(eval(math))];
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

/**
 * @returns current number includes a comma
 */

function is_comma_number(){
    let last_comma = math.lastIndexOf(".");
    if(last_comma == -1){
        return false;
    }
    let after_comma = math.slice(last_comma + 1);
    let is_comma_number = true;
    after_comma.forEach(element => {
        if(!is_number(element)){
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
        if(value == "square_root") math_array[index] = "**0.5";
        if(value == "power") math_array[index] = "**2";
        if(value == "pi") math_array[index] = Math.PI;
    });
    return math_array;
}

function debug(){
    console.log(`math type: ${typeof math}\nmath value: ${math}\nmath as string: ${math.join("")}\nmath translated: ${translate_for_calculate(math).join("")}`);
}

function is_number(operation){
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(operation);
}

function last_math_element(){
    return math[math.length -1];
}

function element_needs_operator(operation){
    return ([")", "ans", "pi", "square_root", "power"].includes(last_math_element()) && (!basic_operators.includes(operation) || ["power", "square_root"].includes(operation))) || (["(", "ans", "pi"].includes(operation) && is_number(last_math_element()));
}

function basic_operators_behind_each_other(operation){
    return basic_operators.includes(operation) && basic_operators.includes(last_math_element());
}

function auto_zero_before_comma(){
    return !(is_number(last_math_element()) || last_math_element() == ".");
}