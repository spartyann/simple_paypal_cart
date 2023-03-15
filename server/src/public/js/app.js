// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
    <div class="container-fluid">
		<h1>Paiement</h1>

		<paypalBtn></paypalBtn>
	</div>
`;

$(function() {
	Vue.createApp({
		data() {
			return {

				products: []
			}
		},
		components: {
			'paypalBtn': Vue.defineAsyncComponent( () => import('./paypal_btn.js'))
		},
		template: template,
		methods: {
			
		},
		mounted() {
			//this.getWorkers();
		}
	}).mount('#app')
	
})

