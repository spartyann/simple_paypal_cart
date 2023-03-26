// https://dev.to/krowemoh/a-vue3-tutorial-08-vue-components-without-a-build-system-2-a-better-way-g1g
// VS plug-in: Comment tagged templates
const template = /*html*/`
	
    <div class="container main-container">
		<admin v-if="isRouteAdmin"></admin>
		<client v-else></client>
	</div>
`;

let urlParams = new URLSearchParams(window.location.search)

$(function() {
	let app = Vue.createApp({
		data() {
			return {

			}
		},
		components: {
			'client': Vue.defineAsyncComponent( () => import('./client.js')),
			'admin': Vue.defineAsyncComponent( () => import('./admin.js')),
			
		},
		template: template,

		computed: {
			isRouteAdmin() {
				return urlParams.has("admin");
			}
		},
		methods: {
			
		},
		mounted() {
			
		}
	})

	const i18n = VueI18n.createI18n({
		locale: global_locale,
		messages: global_lang_messages,
	}) 

	app.use(i18n)

	app.mixin({
		methods: {
			ellipsis: function(str, maxLength = 50)
			{
				if (str == undefined || str == null) return '';
				if (str.length > maxLength - 3) return str.substring(0, maxLength - 3) + '...';
				else return str;
			},
		}
	});
	app.mount('#app')
	
})

