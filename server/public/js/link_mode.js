// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`

	<h1>{{ $t("title") }}</h1>

	<div>

		<div v-for="(product, indexProdut) in products">
			
			<div class="pb-3 pt-3 border-bottom"
				:class="{
					'border-top': indexProdut == 0
				}">
				<div class="row g-0">
					<div class="col-xs-12 col-sm-4 product-image p-2 text-start" v-if="product.image != '' && product.image != null">
						<img class="img-fluid rounded" :src="product.image" />
					</div>
				
					<div class="col-xs-12 col-sm-8 p-2">
						<h5 class="">
							{{ product.name }}
						</h5>
						<h6 class="mb-2 fz-80 text-muted">{{ product.description }}</h6>
						<div>
							
							<ul class="list-group">
								<template v-for="(option) in product.options">
									<li class="list-group-item list-group-item-action" 
										@click="selectOption(option)"
										v-if="option.link !== undefined"
									>
										<span class="float-end badge bg-secondary" v-if="option.price !== null">
											{{ option.price }} {{ currencySymbol }}
										</span>
										<div>{{ option.name }}</div>
										<div class="fz-80" v-if="option.description != undefined">
											<i>{{ option.description }}</i>
										</div>
									</li>
								</template>
							</ul>
							
						</div>
					</div>
				</div>
			</div>
			
		</div>
			

	</div>

`;

export default {
	data() {
		return {

		}
	},
	components: {

		
	},
	template: template,

	computed: {
		currencySymbol() { return global_currency_symbol; },
		products() {
			let products = _.cloneDeep(global_products);



			return products;
		},
	},
	methods: {
		selectOption(option) {
			location.href= option.link;
		}
	},
	mounted() {
		
		
		
	}
}
