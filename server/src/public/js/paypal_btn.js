
const template = /*html*/`
    <div class="pt-4">
		<div ref="paypal_button_container" class="paypal_button_container"></div>
	</div>
`;

export default {

	template: template,
    props: [ ],

    data() {
        return {
           

        }
    },

	mounted(){

		paypal.Buttons({
			// https://developer.paypal.com/sdk/js/reference/#style
			style: {
				layout: 'horizontal', // horizontal, vertical
				color:  'silver', // gold, blue, silver, white, black
				shape:  'pill', // pill, rect
				label:  'pay',  // paypal, checkout, buynow, pay, installment
				tagline: false, // true, false
			},
			// Order is created on the server and the order id is returned
			createOrder(data, actions) {

				return actions.order.create({
					purchase_units: [
						{
							description: 'Description du produit',
							amount: {
								currency_code: global_paypal_currency,
								value: 10,
								breakdown: {
									item_total: {
										currency_code: global_paypal_currency,
										value: 10
									}
								}
							},
							items: [
								{
									name: "Produit 1",
									quantity: 1,
									unit_amount : {
										currency_code: global_paypal_currency,
										value: 10,
									}
								}
							]
						}
					]
				});

			},
			// Finalize the transaction on the server after payer approval
			onApprove(data) {

				console.log(data);
			  
			},

				 
			onCancel(data) {
				console.log("Paiement annulé");
			},
			onError(err) {

			},

		  }).render(this.$refs.paypal_button_container);

	
	}
    
}
