import React, { Component, Fragment } from 'react'
import PaypalCheckout from '../PaypalCheckout'
import StripeCheckout from '../StripeCheckout'


class Payment extends Component {

	render(){
		return (
			<div className='payment'>
				<PaypalCheckout
					order={this.props.order}
					subTotal={this.props.subTotal}
					discounts={this.props.discounts}
					user={this.props.user}
				/>

				<StripeCheckout
					order={this.props.order}
					subTotal={this.props.subTotal}
					discounts={this.props.discounts}
					user={this.props.user}
					handleOrderCompleted={ this.props.handleOrderCompleted }
				/>
			</div>
		)
	}
}


export default Payment
