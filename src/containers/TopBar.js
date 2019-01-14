import React, {Component} from "react"; 
import ClearButton from "../components/ClearButton";
import Screen from "../components/Screen";

class TopBar extends Component {
	render() {
		return (
			<div className="top">
				<ClearButton className="clear" clearScreen={this.props.clearScreen}>C</ClearButton>
				<Screen len={this.props.length}>{this.props.display}</Screen>
			</div>
		);
	}
}

export default TopBar;