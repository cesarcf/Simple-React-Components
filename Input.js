import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

class Input extends Component {

	render(){

		return (
			<input
				type={ this.props.type }
				value={ this.props.value }
				className={ classNames('form-control', this.props.className, this.props.errorClass) }
				src={ this.props.src }
				placeholder={ this.props.placeholder }
				maxlength={ this.props.maxlength }
				onChange={ this.props.onChange }
			/>
		)
	}
}


Input.defaultProps = {
	type: 'text',
	value: null,
	className: null,
	errorClass: null,
	src: null,
	placeholder: null,
	maxlength: null
};


export default Input
