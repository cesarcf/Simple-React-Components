import React, { Component, Fragment } from 'react'
import Input from '../../Input'
import classNames from 'classnames'
class Radio extends Component {
	state = {
		value: null
	}

	componentWillMount(){
		this.setState({ value: this.props.value })
	}

	render(){
		return (
			<div className='container'>
				<Input id={ this.props.id } type='radio' {...this.props} />
				<label for={ this.props.id }>{ this.props.text || this.props.value }</label>
			</div>
		)
	}
}

Radio.defaultProps = {
	className:'radio',
	value: null,
	for: null
};

export default Radio