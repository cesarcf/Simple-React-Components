import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import StarGroup from './StarGroup'
import Star from './StarGroup/Star'
import getRaitingBySlug from '../../graphql/queries/getRaitingBySlug'
import addRaitingToProduct from '../../graphql/mutations/addRaitingToProduct'

class RaitingStars extends Component {

	handleScore = (score) => {
		const { addRaitingToProduct, slug } = this.props
		addRaitingToProduct({ variables:{ slug, score } })
	}

	render(){
		const { loading: loadingRaiting } = this.props.getRaitingBySlug
		if(loadingRaiting) { return <div/> }

		const { getRaitingBySlug: { raiting } } = this.props.getRaitingBySlug
		if(!raiting) { return <div/> }

		const { user } = this.props

		let voteUser = raiting.find(vote => vote.user._id == user._id)//:vote|undefined
		let totalScore = raiting.reduce((previus, vote) => previus + vote.score, 0)


		return (
			<div className="raiting">
				<div className="raiting-stars-container">
			 		<StarGroup score={voteUser === undefined ? 0 : voteUser.score} handleScore={this.handleScore}>
						<Star />{/* Este es ignorado, trae la info por defecto */}
						<Star />
						<Star />
						<Star />
						<Star />
						<Star />
					</StarGroup>

					<div className="raiting-counts">
						<span>Score: { parseFloat(totalScore/raiting.length) || 0} ({parseInt(raiting.length) || 0} {(parseInt(raiting.length) == 1) ? 'Voto' : 'Votos'})</span>
					</div>
				</div>

			</div>
		)
	}
}


export default compose(
	graphql(getRaitingBySlug, { name: 'getRaitingBySlug', options: ({ slug }) => ({ variables: { slug } }) }),
	graphql(addRaitingToProduct, { name: 'addRaitingToProduct' })
)(RaitingStars)
