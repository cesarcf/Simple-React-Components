import React, { Component, Fragment } from 'react'
import classNames from 'classnames'


class StarGroup extends Component {
	state = {
		score: 0,
		textActive:'',
		stars:[
			{ index:0, full:'', active:'', text:'Puntue este Producto!' },//Ignorado en el Render
			{ index:1, full:'', active:'', text:'Inservible!' },
			{ index:2, full:'', active:'', text:'Muy Mejorable!' },
			{ index:3, full:'', active:'', text:'Mejorable!' },
			{ index:4, full:'', active:'', text:'Recomendable!' },
			{ index:5, full:'', active:'', text:'Indispensable!' }
		]
	}

	handleClick = (event, score) => {
		event.preventDefault()

		this.props.handleScore(score)
		this.setState({ score })
	}

	handleStars = (event, toogle, index) => {
		event.preventDefault()
		let newState = Object.assign({}, this.state)
		let newTextActive = ''
		let newStars = newState.stars.map(star => {

			if(star.index <= index){
				///Full Star
				star.full = (toogle == 'over') ? 'star-full' : ''
			}
			//Active Star
			star.active = (star.index <= this.state.score) ? 'star-active' : ''

			//Active Text:
			//Si esta "over" ponemos el Text de la Star, "out" ponemos el text del score
			newTextActive = (toogle == 'over') ? this.state.stars[index].text : this.state.stars[this.state.score].text

			return star
		})


		this.setState({ stars: newStars, textActive: newTextActive })
	}

	componentWillMount(){
		let newStars = this.state.stars.map(star => {
			star.active = (star.index <= this.props.score) ? 'star-active' : ''

			return star
		})

		this.setState({
			score: this.props.score,
			textActive: this.state.stars[this.props.score].text,
			stars: newStars
		})
	}

	render(){
		return (
			<Fragment>
			<div className="raiting-information">{ this.state.textActive }</div>

			<div className={ classNames(this.props.className) }>
				{
					React.Children.map(this.props.children, (star, index) => {
						if(index == 0) return //ignoramos el primer elemento
						return React.cloneElement(star, {
							index: index,
							full: this.state.stars[index].full,
							active: this.state.stars[index].active,
							handleToogleStar: (event, toogle, index) => this.handleStars(event, toogle, index),
							handleClick: (event, score) => this.handleClick(event, score)
						})
					})
				}
			</div>
			</Fragment>
		)
	}

}

StarGroup.defaultProps = {
	score: 0,
	className: 'raiting-stars'
}

export default StarGroup