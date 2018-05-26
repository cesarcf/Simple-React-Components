import React, { Component, Fragment } from 'react'
import Input from '../Input'

class Street extends Component {

	state = {
		street: '',//field Value
		errors: {
			streetIsModified: null, //null|error
			streetErrorClass: null //null|error
		}
	}

	handleChange = (event) => {
		let isValid = /^[0-9A-Za-zÁáÉéÍíÓóÚúñÑÄäËëÏïÖöÜü\s\.(),\/_-ªº]{7,}$/.test(event.target.value)
		isValid
			? this.setState({ street:event.target.value, errors: { streetErrorClass: null, streetIsModified: null } })
			: this.setState({ street:event.target.value, errors: { streetErrorClass: 'error', streetIsModified: 'error' } })
	}


	componentWillMount(){
		this.setState({ street: this.props.value })
	}


	render(){
		return (
			<Input
				value={ this.state.street }
				errorClass={ this.state.errors.streetErrorClass }
				placeholder={ this.props.placeholder }
				onChange={ this.handleChange }
			/>
		)
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state !== nextState
	}


	componentWillUpdate(nextProps, nextState){
		this.props.handleErrors(nextState)
	}

}

Street.defaultProps = {
	placeholder: 'Direccion'
};

export default Street