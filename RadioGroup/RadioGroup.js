import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

class RadioGroup extends Component {
	state = {
		[this.props.name]: null,
		errors: {
			[`${this.props.name}IsModified`]: 'error', //null|error
			[`${this.props.name}ErrorClass`]: null //null|error
		}
	}

	componentWillMount(){
		this.setState({
			[this.props.name]: this.props.defaultValue,
			errors:{
				[`${this.props.name}IsModified`]: this.props.defaultValue ? null : 'error',
				[`${this.props.name}ErrorClass`]: null
			}
		})
	}

	handleClick = (event) => {
		this.setState({
			[this.props.name]: event.target.value,
			errors: {
				[`${this.props.name}IsModified`]: null,
				[`${this.props.name}ErrorClass`]: null
			}
		})
	}

	render(){
		return (
			<div className={ classNames(this.props.className, this.state.errors[`${this.props.name}ErrorClass`]) }>
				{
					React.Children.map(this.props.children, (radioInput, index) => {
						return React.cloneElement(radioInput, {
							id: `${this.props.name}-${index}`,
							name: this.props.name,
							onClick: this.handleClick,
							defaultChecked: this.props.defaultValue == radioInput.props.value ? true : false
						})
					})
				}
			</div>
		)
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state != nextState
	}

	componentWillUpdate(nextProps, nextState){
		this.props.handleErrors(nextState)
	}

}

RadioGroup.defaultProps = {
	defaultValue: null,
	className: 'radio-inline'
};

export default RadioGroup