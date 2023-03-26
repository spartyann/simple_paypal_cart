
const template = /*html*/`
    <div class="pt-4">
		<div ref="paypal_button_container" class="paypal_button_container"></div>
	</div>
`;

export default {

	template: template,

	emits: ['paid'],

	props: {
		products: { },
	},

	watch: {
		products: {
			handler() { this.updatePaypalButton();},
			deep: true
		}
	},

	data() {
		return {
			
		}
	},

	computed: {
		total() {
			let total = 0;
			for (let p of this.products) total += p.total;
			return total;
		}
	},

	mounted(){

		const self = this;
		this.paypal = {};

		paypal.Buttons({
			// https://developer.paypal.com/sdk/js/reference/#style
			style: {
				layout: 'horizontal', // horizontal, vertical
				color:  'silver', // gold, blue, silver, white, black
				shape:  'pill', // pill, rect
				label:  'pay',  // paypal, checkout, buynow, pay, installment
				tagline: false, // true, false
			},

			onInit: function(data, actions) {
				// Get actions
				self.paypal.actions = actions;
				self.updatePaypalButton();
			},
		  

			// Order is created on the server and the order id is returned
			createOrder(data, actions) {

				let items = [];

				for (let product of self.products)
				{
					let name = "";
					if (product.paypalName !== undefined) name += product.paypalName;
					else name += product.name;

					let optionName = "";
					if (product.optionPaypalName !== undefined) optionName += product.optionPaypalName;
					else optionName += product.optionName;

					if (optionName != "") name += " - " + product.optionName;

					//if (product.isCustomPrice)
						name += " - " + product.price + global_currency_symbol

					items.push({
						name: self.ellipsis(name, 125),
						description: "",
						quantity: product.quantity,
						unit_amount : {
							currency_code: global_paypal_currency,
							value: product.price,
						}
					})
				}

				return actions.order.create({
					purchase_units: [
						{
							description: global_paypal_purchase_unit_description,
							amount: {
								currency_code: global_paypal_currency,
								value: self.total,
								breakdown: {
									item_total: {
										currency_code: global_paypal_currency,
										value: self.total
									}
								}
							},
							items: items
						}
					]
				});

			},
			// Finalize the transaction on the server after payer approval
			onApprove(data) {
				self.$emit("paid", data);
			},
				 
			onCancel(data) {
				console.log("Paiement annulé");
				self.$emit("cancelled", data);
			},
			onError(err) {
				self.$emit("errored", err);
			},

		  }).render(this.$refs.paypal_button_container);

	
	},

	methods: {
		updatePaypalButton() {
			if (this.paypal.actions === undefined) return;

			if (this.products.length == 0) this.paypal.actions.disable()
			else this.paypal.actions.enable()
		}
	}

}
