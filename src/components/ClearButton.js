import React, {Component} from "react"; 

class ClearButton extends Component {
	render() {
		return (
			<span className={this.props.className} onClick={this.props.clearScreen}>{this.props.children}</span>
		);
	}
}


export default ClearButton;