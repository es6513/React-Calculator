import React, {Component} from "react"; 
import TopBar from "../containers/TopBar";
import Center from "../containers/Center";

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayOnScreen:[],
			curVal:[],
			operator:false,
			result:null
		};
	}

	//---------------不用eval,使用postfix 來處理---------------------
	 
	opPriority(op){
		return op === "+" || c === "-" ? 1 : c === "x" || c === "÷" ? 2 : 0;
	}

	opDefine(op,num1,num2){
		switch(op){
		case "+": return num1 + num2;
		case "-": return num2 - num1;
		case "x": return num1 * num2;
		case "÷": return num2 / num1;
		}
	}

	handleToPostfix(){

	}

	//---------------end of 不用eval,使用postfix 來處理---------------------

	handleCurvalChange(val,btnType){
		let updatedDisplaVal;
		let updatedCurVal;
		let display = [...this.state.displayOnScreen];
		let curVal = [...this.state.curVal];
		let len = display.length;
		let opArray = ["+","-","x","÷"];
		if(btnType === "number" && display[len - 1] === 0 
		&& (opArray.indexOf(display[len - 2])) > -1){
			return;
		} //避免出現0開頭的字串

		if(len === 0 ){
			updatedDisplaVal = display.concat(val);
			updatedCurVal = curVal.concat(val).join("");
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedCurVal,
				operator:true
			});
		}else if(len > 0 ){
			if(len === 1 && display[len - 1] === 0){
				return;
			}
			updatedDisplaVal = display.concat(val);
			updatedCurVal = curVal.concat(val).join("");
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedCurVal,
				operator:true
			});
		}
	}
	
	handleOperator(op){
		let display = [...this.state.displayOnScreen];
		let len = display.length;
		let updatedDisplaVal;
		let updatedCurVal = [...this.state.curVal];
		updatedCurVal.length = 0;
		if(len === 0 && op === "-"){
			updatedDisplaVal = display.concat(op);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedCurVal,
				operator:false
			});
		}else if(this.state.displayOnScreen && this.state.operator && display[len - 1] !== "." ){
			updatedDisplaVal = display.concat(op);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedCurVal,
				operator:false
			});
		}
	}

	decimalInEquation(val){
		return /\./.test(val);
	}

	handleDecimal(decimal){
		let display = [...this.state.displayOnScreen];
		let curVal = [...this.state.curVal];
		let len = display.length;
		let updatedDisplaVal;
		let updatedCurVal;
		let disableArray = ["+","-","x","÷","."];
		if(len !== 0  && (disableArray.indexOf(display[len - 1])) === -1  ){
			updatedDisplaVal = display.concat(decimal);

			if(!this.decimalInEquation(curVal)){
				updatedCurVal = curVal.concat(decimal).join("");
				this.setState({
					...this.state,
					displayOnScreen:updatedDisplaVal,
					curVal:updatedCurVal
				});			
			}
		
		}
	}

	handleClearScreen(){
		if(this.state.displayOnScreen.length !== 0){
			let updatedDisplaVal = [...this.state.displayOnScreen];
			let updatedCurVal = [...this.state.curVal];
			updatedDisplaVal.length = 0;
			updatedCurVal.length = 0;
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedCurVal,
				operator:"",
				result:""
			});
		}
	}

	//直接用eval算出結果

	handleRounding(val){
		return parseFloat(val.toFixed(10));
	}

	handleEval(btnType){
		let display = [...this.state.displayOnScreen];
		let len = display.length;
		let opArray = ["+","-","x","÷"];
		if(len !== 0 && btnType === "eval" && (opArray.indexOf(display[len - 1])) === -1){
			let evalResultString = display.join("").replace(/x/g, "*").replace(/÷/g, "/");
			let evalResult = eval(evalResultString);
			evalResult = this.handleRounding(evalResult);
			evalResult = evalResult.toString().split("");
			let updatedCurVal = evalResult.join("");
			this.setState({
				...this.state,
				displayOnScreen:evalResult,
				curVal:updatedCurVal,
			});
		}
	}

	render() {
		return (
			<div id="calculator">
				<TopBar 
					display={this.state.displayOnScreen} 
					clearScreen={()=>this.handleClearScreen()}
					length={this.state.displayOnScreen.length}
				/>
				<Center 
					changeDisplay={(val,btnType)=>this.handleCurvalChange(val,btnType)}
					changeOpDisplay={(op)=>this.handleOperator(op)}
					eval={(btnType)=>this.handleEval(btnType)}
					decimal={(decimal)=>this.handleDecimal(decimal)}
				/>
			</div>
		);
	}
}

export default Calculator;
