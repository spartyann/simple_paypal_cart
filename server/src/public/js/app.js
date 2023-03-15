// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
    <div class="container-fluid">
		<h1>

			<button class="btn btn-primary">coucou</button>
		</h1>
	</div>
`;

$(function() {
	Vue.createApp({
		data() {
			return {

				name: "Toto"
			}
		},
		components: {
			//'Table': Vue.defineAsyncComponent( () => import('./test.js'))
		},
		template: template,
		methods: {
			
		},
		mounted() {
			//this.getWorkers();
		}
	}).mount('#app')
	
})

