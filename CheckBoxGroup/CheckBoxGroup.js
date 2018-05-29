import React, { Component, Fragment } from 'react'
import classNames from 'classnames'

class CheckBoxGroup extends Component {

	state = {
		[this.props.name]: [],
		validValues: [],
		errors: {
			[`${this.props.name}IsModified`]: 'error',
			[`${this.props.name}ErrorClass`]: null
		}
	}

	componentWillMount(){
		let validValues = React.Children.map(this.props.children, child => child.props.value)

		this.setState({
			[this.props.name]: this.props.defaultValue,
			validValues,
			errors:{
				[`${this.props.name}IsModified`]: 'error',
				[`${this.props.name}ErrorClass`]: null
			}
		})
	}

	handleClick = (event) => {
		let indexValue = this.state[this.props.name].findIndex(value => value == event.target.value)//:int|-1
		if(indexValue != -1){
			let newArray = [ ...this.state[this.props.name].slice(0, indexValue), ...this.state[this.props.name].slice(indexValue + 1)]

			this.setState({
				[this.props.name]: newArray,
				errors: {
					[`${this.props.name}IsModified`]: null,
					[`${this.props.name}ErrorClass`]: newArray.length == 0 ? 'error' : null
				}
			})


		} else{
			let newArray = [ ...this.state[this.props.name], event.target.value ]

			this.setState({
				[this.props.name]: newArray,
				errors: {
					[`${this.props.name}IsModified`]: null,
					[`${this.props.name}ErrorClass`]: null
				}
			})
		}
	}


	render(){
		return (
			<div className={ classNames(this.props.className, this.state.errors[`${this.props.name}ErrorClass`]) }>
				{
					React.Children.map(this.props.children, (checkbox, index) => {
						return React.cloneElement(checkbox, {
							id: `${this.props.name}-${index}`,
							name: this.props.name,
							onClick: this.handleClick,
							defaultChecked: this.props.defaultValue.some(value => value === checkbox.props.value ? true : false)
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

CheckBoxGroup.defaultProps = {
	defaultValue:[],
	className: 'checkbox-inline'
};

export default CheckBoxGroup