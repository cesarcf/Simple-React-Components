import React, { Component, Fragment } from 'react'
import ReactStripeCheckout from 'react-stripe-checkout'
import Button from '../common/Button'
import axios from 'axios'

class StripeCheckout extends Component {

	handlePayment = token => {
		//Hago un request al backend y proceso el pago con Stripe.(request a Stripe)
		axios.post('/api/stripe', { token })
			.then(res => this.props.handleOrderCompleted(res.data))
			.catch(err => console.log("Error:", err))
	}


	render(){
		const { order:{ address, shoppingCart }, user, subTotal, discounts } = this.props
		return (
			<ReactStripeCheckout
				name='< ProductosNutricionales >'
				description='Productos Herbalife'
				panelLabel='Total'// prepended to the amount in the bottom pay button
				currency='EUR'
				amount={(subTotal - discounts).toFixed(2) * 100}//en centimos
				locale='es'
				email={user.email}
				//Recibo el token de Authentication de la transaccion de "Stripe" y ahora tengo
				//que hacer una llamada a mi backend para pasarle el token y que es lo que quiero
				//pagar.
				token={token => this.handlePayment(token) }
				stripeKey={STRIPE_PUBLISHABLE_KEY}//webpack definePlugin variable
			>
				<Button className='btn-block' text='Stripe Pay' />
			</ReactStripeCheckout>
		)
	}
}

export default StripeCheckout