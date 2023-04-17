// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`

	<h1 class="mb-5 text-center">{{ $t("title.paid") }}</h1>

	<div class="alert alert-success" role="alert" v-html="$t('link_mode.paid.confirmation')"></div>

	<div v-if="productCode != null" class="mt-5">

		<div v-for="(product, indexProdut) in products">
			
			<div class=""
				v-if="product.code == productCode">
			
				<div class="row g-0">
					<div class="col-xs-12 col-sm-4 product-image p-2 text-start" v-if="product.image != '' && product.image != null">
						<img class="img-fluid rounded" :src="product.image" />
					</div>
				
					<div class="col-xs-12 col-sm-8 p-2">
						<h5 class="">
							{{ product.name }}
						</h5>
						<h6 class="mb-2 fz-80 text-muted">{{ product.description }}</h6>
						

						<template v-if="productOptionConfirmationText != ''">
							<div class="text-success" role="alert" v-html="productOptionConfirmationText"></div>
						</template>
					</div>
				</div>
			</div>
			
		</div>
			
	</div>

`;


let urlParams = new URLSearchParams(window.location.search)

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

		productCode() {
			return urlParams.get("product");
		},

		optionCode() {
			return urlParams.get("option");
		},

		productOptionConfirmationText() {
			if (this.productCode == null) return '';

			for (let p of this.products)
			{
				if (p.code != this.productCode) continue;

				if (this.optionCode == null)
				{
					if (p.paid_text == undefined) return '';
					return p.paid_text;
				}

				for (let op of p.options)
				{
					if (op.code != this.optionCode) continue;

					if (op.paid_text == undefined) return '';
					return op.paid_text;
				}
			}

			return '';
		}
	},
	methods: {
		selectOption(option) {
			location.href= option.link;
		}
	},
	mounted() {
		
		
		
	}
}
