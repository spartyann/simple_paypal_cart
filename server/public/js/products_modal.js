// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
	

	<!-- Modal -->
	<div ref="modal" class="modal  fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						{{ $t("modale.product.title")}}
					</h5>
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
													<span class="float-end badge bg-secondary"
														v-if="product.options.length == 1 && product.options[0].price !== null">
														{{ product.options[0].price }} {{ currencySymbol }}
													</span>
												</h5>
												<h6 class="card-subtitle mb-2 fz-80 text-muted">{{ product.description }}</h6>
								
												<div class="mt-3">

													<div v-if="step == 'products'">
														<button class="btn btn-sm btn-primary" @click="selectProduct(product)">
															<span v-if="product.options.length == 1">{{ $t("modale.product.btn.choose_product")}}</span>
															<span v-if="product.options.length > 1">{{ $t("modale.product.btn.choose_option")}}</span>
														</button>
													</div>

													<div v-if="step == 'product' && product.options.length > 1">
														<div>{{ $t("modale.product.option.choose")}}</div>
														<ul class="list-group" v-if="Object.keys(product.options).length > 0">
															<template v-for="(option) in product.options">
																<li class="list-group-item list-group-item-action" 
																:class="{'list-group-item-primary': option.code == selectedOption.code }"
																@click="selectOption(option)"
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

													<div v-if="step == 'product'" class="mt-4">

														<div class="tbl">
															<div class="tr" v-if="selectedOption.price === null">
																<div class="td wsnw vam">Prix:</div>
																<div class="td p-1 vam wsnw">
																	<input class="form-control form-control-sm d-inline" type="number"
																		v-model="customPrice" style="width: 80px"
																		min="1"
																		/>
																		{{ currencySymbol }}
																</div>
															</div>
															<div class="tr">
																<div class="td wsnw vam">{{ $t("modale.product.quantity")}}</div>
																<div class="td p-1 vam">
																	<input class="form-control form-control-sm" type="number"
																		v-model="quantity" style="width: 80px"
																		min="1"
																		:disabled="forceQuantity !== null"
																	/>
																</div>
															</div>
															<div class="tr">
																<div class="td wsnw vam">{{ $t("modale.product.total")}}</div>
																<div class="td p-1 vam">
																	{{ quantity }}
																	&times;
																	{{ effectiveOptionPrice }}
																	=
																	<span class="badge bg-primary fz-100">
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
					
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("modale.product.btn.cancel")}}</button>
					
					<div class="flex-fill"></div>

					<button type="button" class="btn btn-primary" @click="previous" v-if="step != 'products'">
						<span class="material-icons">arrow_back</span>	
						{{ $t("modale.product.btn.previous")}}
					</button>
					
					<button type="button" class="btn btn-success" @click="add" v-if="step == 'product'">
						<span class="material-icons">check</span>	
						{{ $t("modale.product.btn.add")}}
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
	emits: ['add'],

	mounted(){
		this.modal = new bootstrap.Modal(this.$refs.modal)

		if (global_debug)
		{
			let self = this
			setTimeout(() => {
				self.selectProduct(this.products[0])
				self.add();
			}, 700);
		}
	},

	watch: {
		selectedOption: {
			handler() {
				if (this.forceQuantity !== null) this.quantity = this.forceQuantity;
			},
			deep: true
		}
	},


	methods: {
		open(){
			this.modal.show();
			this.step = 'products';
			this.selectedProduct = null;
			this.selectedOption = null;
			this.customPrice = 10;
			this.quantity = 1;
			
		},

		add(){
			this.$emit('add', _.cloneDeep({
				name: this.selectedProduct.name,
				paypalName: this.selectedProduct.paypal_name,
				description: this.selectedProduct.description,
				image: this.selectedProduct.image,
				code: this.selectedProduct.code,
				optionCode: this.selectedOption.code,
				optionName: this.selectedOption.name,
				optionDescription: this.selectedOption.description,
				optionPaypalName: this.selectedOption.paypal_name,
				hasSingleOption: this.hasSingleOption(this.selectedProduct),
				quantity: this.quantity,
				price: this.effectiveOptionPrice,
				isCustomPrice: this.selectedOption.price === null,
				total: this.total,
				detail: {
					product: this.selectedProduct,
					option: this.selectedOption,
					customPrice: this.selectedOption.price === null ? this.customPrice : null,
				},
			}))
			this.modal.hide();
		},

		previous() {
			if (this.step == 'product') this.step = 'products';
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
		},

		forceQuantity() {
			if (this.selectedOption == null) return null;
			if (this.selectedOption.force_quantity == undefined) return null;
			return this.selectedOption.force_quantity;
		}
	}

}
