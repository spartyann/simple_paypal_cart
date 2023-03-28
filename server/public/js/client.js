// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
	<productsModal ref="modalProduct" @add="addProduct"></productsModal>

   

	<h1>{{ $t("title") }}</h1>

	<div v-if="state == 'preparing'">
		<div class="card placehoder" v-if="products.length == 0">
			<div class="card-body">
				{{ $t("cart.no_product")}}
				<div class="pt-3">
					<button type="button" class="btn btn-primary" @click="openModalProduct">
						{{ $t("btn.product.add")}}
					</button>
				</div>
			</div>
		</div>
		<div v-else>
			<cart
				:products="products"
				@deleteProduct="deleteProduct"
			></cart>
			<div class="text-end">
				<button type="button" class="btn btn-primary" @click="openModalProduct">
					{{ $t("btn.product.add")}}
				</button>
			</div>
		</div>
		<paypalBtn :products="products" @paid="paid"></paypalBtn>
	</div>

	<div v-if="state == 'paid'">

		<div class="alert alert-success" role="alert">
			{{ $t("paid.confirmation")}}
		</div>

		<cart
			:products="products"
			:canDelete="false"
		></cart>

	</div>
`;

export default {
	data() {
		return {

			products: [],
			state: 'preparing'
		}
	},
	components: {
		'paypalBtn': Vue.defineAsyncComponent( () => import('./paypal_btn.js')),
		'productsModal': Vue.defineAsyncComponent( () => import('./products_modal.js')),
		'cart': Vue.defineAsyncComponent( () => import('./cart.js')),
		
	},
	template: template,

	computed: {
		currencySymbol() { return global_currency_symbol; },
		total() {
			let total = 0;
			for (let p of this.products) total += p.total;
			return total;
		}
	},
	methods: {
		addProduct(product)
		{
			//console.log(product);
			this.products.push(product);
		},

		openModalProduct() {
			this.$refs.modalProduct.open();
		},

		deleteProduct(ip) {
			this.products.splice(ip,1);
		},

		paid(paypalResult) {
			this.state = 'paid'
			this.save(paypalResult);
		},

		save(paypalResult){
			axios.post('/', {
				action: "save_payment",
				products: this.products,
				paypalResult: paypalResult
				
			}).then(function (response) {

			}).catch(function (error) {
				
			})
		}
	},
	mounted() {
		const self = this;
		this.$nextTick(() => {
			setTimeout(() => {
				if (global_auto_open_modal_product) self.openModalProduct();
			}, 100)
		})
		
		
	}
}
