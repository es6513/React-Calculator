import React, {Component} from "react"; 

class Screen extends Component {
	render() {
		let style = {"fontSize":"24px"};
		if(this.props.len >= 18){
			style = {"fontSize":"20px"};
		}
		return (
			<div className="screen" style={style}>{this.props.children}</div>
		);
	}
}

export default Screen;
