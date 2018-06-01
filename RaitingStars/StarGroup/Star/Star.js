import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'


class Star extends Component {
	render(){
		return (
			<span
				className={ classNames('star', this.props.full, this.props.active) }
				onMouseOver={ event => this.props.handleToogleStar(event, 'over', this.props.index) }
				onMouseOut={ event => this.props.handleToogleStar(event, 'out', this.props.index) }
				onClick={ event => this.props.handleClick(event, this.props.index) }
			/>
		)
	}
}

Star.defaultProps = {
	index: null,
	full: '',
	active: ''
};

export default Star