import React, { Component, Fragment } from 'react'
import Input from '../../Input'


class CheckBox extends Component {
	state = {
		value: null
	}

	componentWillMount(){
		this.setState({ value: this.props.value })
	}

	render(){
		return (
			<div className='container'>
				<Input id={ this.props.id } type='checkbox' defaultChecked={ this.props.defaultChecked } {...this.props} />
				<label for={ this.props.id }>{ this.props.text || this.props.value }</label>
			</div>
		)
	}

}

CheckBox.defaultProps = {
	defaultChecked: null,
	value: null,
	for: null
};

export default CheckBox