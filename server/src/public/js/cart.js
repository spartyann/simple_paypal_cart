// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
	<div>
		<table class="table table-sm">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Qté</th>
					<th scope="col">Total</th>
					<th style="width: 20px" v-if="canDelete"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(product, indexProdut) in products">
					
					<td>
						<div class="row g-0">
							<div class="col-sm-12 col-md-4 product-image p-2 text-start" v-if="product.image != '' && product.image != null">
								<img :src="product.image" />
							</div>

						
							<div class="col-sm-12 col-md-8 p-2">
								<h5 class="card-title">
									{{ product.name }}
								</h5>
								<h6 class="card-subtitle mb-2 fz-80 text-muted">{{ product.description }}</h6>
								<p>
									{{ product.optionName }}
									<span class="badge bg-secondary">
										{{ product.price }} {{ currencySymbol }}
									</span>
								</p>
							</div>
						</div>
					</td>
					<td class="text-center"><span>{{ product.quantity }}</span></td>
					<td class="text-center"><span>{{ product.total }} {{ currencySymbol }}</span></td>
					<td v-if="canDelete">
						<a class="btn btn-link p-0" @click="deleteProduct(indexProdut)">
							<span class="material-icons">delete</span>
						</a>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<th class="text-end">Total</th>
					<th></th>
					<th><span class="badge bg-primary">{{ total }} {{ currencySymbol }}</span></th>
					<th></th>
				</tr>
			</tfoot>
		</table>
			
	</div>
`;

export default {

	props: {
		products: { },
		canDelete: { default: true, type: Boolean },
	},
	emits: ['delete'],

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

		deleteProduct(ip){
			this.$emit('delete', ip);
			this.products.splice(ip,1);
		}
	},
	mounted() {

	}
}



