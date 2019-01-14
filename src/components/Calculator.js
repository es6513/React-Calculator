import React, {Component} from "react"; 
import TopBar from "../containers/TopBar";
import Center from "../containers/Center";

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayOnScreen:[],
			curVal:null,
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
		let display = [...this.state.displayOnScreen];
		let len = display.length;
		let opArray = ["+","-","x","÷"];
		if(btnType === "number" && display[len - 1] === 0 
		&& (opArray.indexOf(display[len - 2])) > -1){
			return;
		} //避免出現0開頭的字串

		if(len === 0 ){
			updatedDisplaVal = display.concat(val);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedDisplaVal,
				operator:true
			});
		}else if(len > 0 ){
			if(len === 1 && display[len - 1] === 0){
				return;
			}
			updatedDisplaVal = display.concat(val);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:updatedDisplaVal,
				operator:true
			});
		}
	}
	
	handleOperator(op){
		let display = [...this.state.displayOnScreen];
		let len = display.length;
		let updatedDisplaVal;
		if(len === 0 && op === "-"){
			updatedDisplaVal = display.concat(op);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:op,
				operator:false
			});
		}else if(this.state.displayOnScreen && this.state.operator && display[len - 1] !== "." ){
			updatedDisplaVal = display.concat(op);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal,
				curVal:op,
				operator:false
			});
		}
	}

	handleDecimal(decimal){
		let display = [...this.state.displayOnScreen];
		let len = display.length;
		let updatedDisplaVal;
		let disableArray = ["+","-","x","÷","."];
		if(len !== 0  && (disableArray.indexOf(display[len - 1])) === -1){
			updatedDisplaVal = display.concat(decimal);
			this.setState({
				...this.state,
				displayOnScreen:updatedDisplaVal
			});
		}
	}

	handleClearScreen(){
		if(this.state.displayOnScreen.length !== 0){
			let display = [...this.state.displayOnScreen];
			display.length = 0;
			this.setState({
				...this.state,
				displayOnScreen:display,
				curVal:null,
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
			evalResult = [].concat(evalResult);
			this.setState({
				...this.state,
				displayOnScreen:evalResult
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
