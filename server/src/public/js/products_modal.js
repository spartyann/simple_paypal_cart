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
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<div class="card product mb-2" v-for="(product) in products">
						<div class="row g-0">
							<div class=" col-sm-12 col-md-4 product-image" v-if="product.image != '' && product.image != null">
								<img :src="product.image" />
							</div>
							<div class="col-sm-12 col-md-8">
								<div class="card-body">
								
									<h5 class="card-title">{{ product.name }}</h5>
									<h6 class="card-subtitle mb-2 text-muted">{{ product.description }}</h6>

									<ul class="list-group" v-if="Object.keys(product.options).length > 0">
										<li class="list-group-item" v-for="(option) in product.options">
											<span class="float-end badge bg-secondary">{{ option.price }} {{ currencySymbol }}</span>
											{{ option.name }}
										</li>
									</ul>
								
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
					<button type="button" class="btn btn-primary" @click="add">Ajouter</button>
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
		}
	},

	computed: {
		products() {
			return _.cloneDeep(global_products);
		},

		currencySymbol() { return global_currency_symbol; }
	}
    
}
