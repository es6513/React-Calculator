import React, {Component} from "react"; 

class Button extends Component {

	handleButton(type){
		switch (type) {
		case "number":
			this.props.buttonClick();
			break;
		case "operator":
			this.props.operatorClick();
		case "eval":
			this.props.evalClick();
			break;
		case "decimal":
			this.props.decimalClick();
			break;
		default:null;
			break;
		}
	}

	render() {
		return (
			<span 
				className={this.props.className} 
				onClick={()=>this.handleButton(this.props.type)}>
				{this.props.children}
			</span>
		);
	}
}


export default Button;