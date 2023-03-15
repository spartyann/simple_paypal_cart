// VS plug-in: Comment tagged templates
const template = /*html*/`
    <div class="container-fluid">
		<h1>

		sdf
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

