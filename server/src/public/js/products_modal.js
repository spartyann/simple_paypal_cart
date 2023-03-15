// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
	<button type="button" class="btn btn-primary" @click="open">
		Ajouter un produit
	</button>

	<!-- Modal -->
	<div ref="modal" class="modal  fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Choisissez un produit</h5>
				</div>
				<div class="modal-body">

					<template v-if="step == 'products' || step == 'product'">
						<template v-for="(product) in products">
							<template v-if="step == 'products' || product.code == selectedProduct.code">
								<div class="card product mb-2 mt-2 pt-2 pb-2">
								
									<div class="row g-0">
										<div class="col-sm-12 col-md-4 product-image mb-3" v-if="product.image != '' && product.image != null">
											<img :src="product.image" />
										</div>
										<div class="col-sm-12 col-md-8">
											<div class="card-body pt-0">
								
												<h5 class="card-title">
													{{ product.name }}
													<span class="float-end badge bg-secondary" v-if="product.options.length == 1">
														{{ product.options[0].price }} {{ currencySymbol }}
													</span>
												</h5>
												<h6 class="card-subtitle mb-2 text-muted">{{ product.description }}</h6>
								
												<div class="mt-3">

													<div v-if="step == 'products'">
														<button class="btn btn-primary" @click="selectProduct(product)">
															<span v-if="product.options.length == 1">Choisir ce produit</span>
															<span v-if="product.options.length > 1">Choisir une option</span>
														</button>
													</div>

													<div v-if="step == 'product' && product.options.length > 1">
														<ul class="list-group" v-if="Object.keys(product.options).length > 0">
															<template v-for="(option) in product.options">
																<li class="list-group-item list-group-item-action" 
																:class="{'list-group-item-primary': option.code == selectedOption.code }"
																@click="selectOption(option)"
																>
																	<span class="float-end badge bg-secondary" v-if="option.price !== null">
																		{{ option.price }} {{ currencySymbol }}
																	</span>
																	{{ option.name }}
																</li>
															</template>
														</ul>
													</div>

													<div v-if="step == 'product'" class="mt-4">

														<div class="tbl">
															<div class="tr" v-if="selectedOption.price === null">
																<div class="td wsnw vam">Prix:</div>
																<div class="td p-1 vam">
																	<input class="form-control form-control-sm" type="number"
																		v-model="customPrice" style="width: 80px"
																		min="1"
																		/>
																</div>
																<div class="td wsnw  vam">
																	{{ currencySymbol }}
																</div>
															</div>
															<div class="tr">
																<div class="td wsnw vam">Quantité:</div>
																<div class="td p-1 vam">
																	<input class="form-control form-control-sm" type="number"
																		v-model="quantity" style="width: 80px"
																		min="1"
																	/>
																</div>
																<div class="td wsnw vam">
																	<span class="badge bg-secondary ms-3">
																		{{ total }} {{ currencySymbol }}
																	</span>
																</div>
															</div>
														</div>

													</div>
												</div>
												
											</div>
										</div>
									</div>
								</div>
							</template>
						</template>
					</template>

					

				</div>
				<div class="modal-footer">
					
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
					
					<div class="flex-fill"></div>

					<button type="button" class="btn btn-primary" @click="previous" v-if="step != 'products'">
						<span class="material-icons">arrow_back</span>	
						Précédent
					</button>
					
					<button type="button" class="btn btn-primary" @click="add" v-if="step == 'final'">
						<span class="material-icons">check</span>	
						Ajouter
					</button>
				</div>
			</div>
		</div>
	</div>
`;

export default {

	template: template,
	props: [ ],

	data() {
		return {
			step: 'products',
			selectedProduct: null,
			selectedOption: null,
			customPrice: 10,
			quantity: 1
		}
	},

	mounted(){
		this.modal = new bootstrap.Modal(this.$refs.modal)
	
	},

	methods: {
		open(){
			this.modal.show();
		},

		add(){
			this.modal.hide();
		},

		previous() {
			if (this.step == 'product') this.step = 'products';
			if (this.step == 'final') this.step = 'product';
		},

		selectProduct(product) {
			this.selectedProduct = product;
			this.selectedOption = product.options[0]
			this.step = 'product'
		},

		hasSingleOption(product) {
			return product.options.length == 1;
		},

		selectOption(option){
			this.selectedOption = option
		}

		
	},

	computed: {
		products() {
			return _.cloneDeep(global_products);
		},

		currencySymbol() { return global_currency_symbol; },

		currentProductHasSingleOption(product) {
			return this.selectedProduct.options.length == 1;
		},

		effectiveOptionPrice(){
			if (this.selectedOption.price === null) return this.customPrice;
			return this.selectedOption.price
		},

		total(){
			return this.quantity * this.effectiveOptionPrice

		}
	}

}
