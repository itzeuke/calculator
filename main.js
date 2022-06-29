let result_area = document.getElementById("result_area");
let math = [];

function button_operation(operation){
    result_area.innerHTML += translate_for_display(operation);
    math.push(operation);
    console.log(math);
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
    math = eval(math.join(" "));
    result_area.innerHTML = math;
}