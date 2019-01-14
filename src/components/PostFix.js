// 中序轉後序方式

Array.prototype.getLast = function() {
	return this[this.length - 1];
};

Array.prototype.isEmpty = function() {
	return this.length === 0;
};

function priority(c) {
	return c === "+" || c === "-" ? 1 : c === "x" || c === "÷" ? 2 : 0;
}

function toPostfix(infix) {
	// var expr =  infix.split("");
	var stack = [];
	var output = [];
	infix.forEach(function(c) {
		// if(c === "(") { stack.push(c); }
		if("+-x÷".indexOf(c) !== -1) {
			while(!stack.isEmpty() && 
								 priority(stack.getLast()) >= priority(c)) {
				output.push(stack.pop());
			}
			stack.push(c);
		}
		// else if(c === ")") {
		// 	while(stack.getLast() !== "(") {
		// 		output.push(stack.pop());
		// 	}
		// 	stack.pop();
		// }
		else { output.push(c); }
	});
	
	while(!stack.isEmpty()) { output.push(stack.pop()); }
	return  output.join("");
}


var infix = [1,"+",2,"x","3","+","4","÷","2"];
console.log(toPostfix(infix));
function cal(operator,num1,num2){
	switch(operator){
	case "+": return num1 + num2;
	case "-": return num2 - num1;
	case "x": return num1 * num2;
	case "÷": return num2 / num1;
	}
}

function calculate(result){
	var _stack = [];
	for(let i = 0;i < result.length ; i++){
		if(priority(result[i]) !== 0){
			var num1 = _stack.pop();
			var num2 = _stack.pop();
			_stack.push(cal(result[i],num1,num2));
		}
		else{
			_stack.push(parseFloat(result[i]));
		}
	}
	return _stack.pop();
}

console.log(calculate(toPostfix(infix)));