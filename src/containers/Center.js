import React, {Component} from "react"; 
import Button from "../components/Button";

const centerEl = [
	{
		label:7,
		type:"number"
	},
	{
		label:8,
		type:"number"
	},
	{
		label:9,
		type:"number"
	},
	{
		label:"+",
		type:"operator"
	},
	{
		label:4,
		type:"number"
	},
	{
		label:5,
		type:"number"
	},
	{
		label:6,
		type:"number"
	},
	{
		label:"-",
		type:"operator"
	},
	{
		label:1,
		type:"number"
	},
	{
		label:2,
		type:"number"
	},
	{
		label:3,
		type:"number"
	},
	{
		label:"÷",
		type:"operator"
	},
	{
		label:0,
		type:"number"
	},
	{
		label:".",
		type:"decimal"
	},
	{
		label:"=",
		type:"eval"
	},
	{
		label:"x",
		type:"operator"
	}
];

class Center extends Component {
	render() {
		let buttons = centerEl.map(el=>{
			return <Button 
				className={el.type} 
				key={el.label} 
				type={el.type}
				operatorClick={()=>this.props.changeOpDisplay(el.label)}
				buttonClick={()=>this.props.changeDisplay(el.label,el.type)}
				evalClick={()=>this.props.eval(el.type)}
				decimalClick={()=>this.props.decimal(el.label)}
			>{el.label}</Button>;
		});
		return (
			<div className="keys">
				{buttons}
			</div>
		);
	}
}

export default Center;
