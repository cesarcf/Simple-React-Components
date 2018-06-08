import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout'

//Paypal Button Component
const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

class PaypalCheckout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showButton: true,
			env: 'sandbox',// sandbox | production
			style: {
				label: 'paypal',
				fundingicons: true,
				label: 'checkout',
				size:  'responsive',
				shape: 'rect',
				color: 'blue'
			},
			client: {
					sandbox: PAYPAL_CLIENT_ID_SANDBOX,
					production: PAYPAL_CLIENT_ID_PRODUCTION
			},
			commit: true // Show the buyer a 'Pay Now' button in the checkout flow | 'Continue'
		}
	}



	/**
	*
	* payment() is called when the button is clicked
	**/
	payment(data, actions) {
		const { order:{ address, shoppingCart }, user, subTotal, discounts } = this.props

		// Make a call to the REST api to create the payment
		return actions.payment.create({
			intent: 'sale',//Makes an immediate payment (otras opciones -> authorize | order)
			'payer': {
				'payment_method': 'paypal',
				'payer_info':{
					'email': user.email
				}
			},
			'application_context': {
				//Use the application context resource to customize payment flow experience for your buyers.
				'brand_name': 'ProductosNutricionales.es',
				'locale': 'ES',//The locale of pages that the PayPal payment experience displays
				'landing_page': 'Billing',//Billing(pago con tarjeta) | Login(pago con paypal)
			},
			transactions: [
				{
					amount: {
						'details': {
							'subtotal': subTotal,
							'tax': '0.00',
							'shipping': '0.00',
							'handling_fee': '0.00',
							'shipping_discount': `-${discounts}`,
							'insurance': '0.00'//Seguro de la transaccion
						},//details
						total: (subTotal - discounts).toFixed(2),
						currency: 'EUR'//USD
					},//amount
					'description': 'Esta es la descripcion del pago.',
					'item_list': {
						'items': shoppingCart.map(item => {
							return {
								'name': item.product.name,
								'sku': item.product.sku,
								'price': item.product.price,
								'currency': 'EUR',
								'quantity': item.units
							}
						}),
						'shipping_address': {
							'recipient_name': user.firstName,
							'line1': address.street,
							'line2': '',
							'city': address.city,
							'country_code': 'ES',
							'postal_code': address.postalCode,
							'phone': '0034629648642',
							'state': address.province
						}//shipping_address

					}//item_list
				}
			],//fin transactions
			'note_to_payer': 'Recibira su pedido en 24/48 por transporte urgente. Contacte con nosotros para cualquier pregunta sobre su pedido en el numero +34 629 648 642'
		})
	}

	/**
	*
	* onAuthorize() is called when the buyer approves the payment
	**/
	onAuthorize(data, actions) {
		// Make a call to the REST api to execute the payment
		return actions.payment.execute().then(function(paymentData) {
			// Show a success page to the buyer
			console.log(paymentData)
			console.log('Payment Complete!')
		})
	}


	render() {
			const { showButton } = this.state
			return (
				<PayPalButton
					commit={ this.state.commit } // Optional: show a 'Pay Now' button in the checkout flow
					env={ this.state.env }
					client={ this.state.client }
					payment={ (data, actions) => this.payment(data, actions) }
					onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
					style={this.state.style}
				/>
			)
	}
}

export default PaypalCheckout