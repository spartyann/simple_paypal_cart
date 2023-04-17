<?php

namespace App;

use Config\Config;

class Page {

	public static function print() {

		$debug = Config::$DEBUG;
		$debug_string = Config::$DEBUG ? 'true': 'false';

		$mode = Config::$MODE;

		$title= Config::PAGE_TITLE();
		$body_before = Config::BODY_BEFORE();
		$body_after = Config::BODY_AFTER();
		$custom_style = Config::CUSTOM_STYLE();
		$paypal_client_id = Config::$PAYPAL_CLIENT_ID;
		$paypal_currency = Config::$PAYPAL_CURRENCY;
		$currency_symbol = Config::$CURRENCY_SYMBOL;
		$auto_open_modal_product = Config::$AUTO_OPEN_MODAL_PRODUCT;
		$paypal_purchase_unit_description = Config::$PAYPAL_PURCHASE_UNIT_DESCRIPTION;

		$locale = Config::$LOCALE;
		$lang_messages = json_encode(Lang::MESSAGES());
		
		$productsString = json_encode(Config::PRODUCTS());
		

		$vueUrl = Config::$DEBUG ? 'https://unpkg.com/vue@3.2.47/dist/vue.global.js' : 'https://unpkg.com/vue@3.2.47/dist/vue.global.prod.js';
		$vueI18nUrl = Config::$DEBUG ? 'https://unpkg.com/vue-i18n@9.1.0/dist/vue-i18n.global.js' : 'https://unpkg.com/vue-i18n@9.1.0/dist/vue-i18n.global.prod.js';

		echo <<<HTML
<!doctype html>
<html lang="fr-fr" dir="ltr">
	<head>
		<title>$title</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<link href="/css/app.css" rel="stylesheet" />
		
		<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">-->

		<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.4/axios.min.js" integrity="sha512-LUKzDoJKOLqnxGWWIBM4lzRBlxcva2ZTztO8bTcWPmDSpkErWx0bSP4pdsjNH8kiHAUPaT06UXcb+vOEZH+HpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

		<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

		<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

		<!-- Replace "test" with your own sandbox Business account app client ID -->
		<script src="https://www.paypal.com/sdk/js?client-id={$paypal_client_id}&currency={$paypal_currency}"></script>

		<script src="$vueUrl"></script>
		<script src="$vueI18nUrl"></script>
		
		<style>{ $custom_style }</style>

		<script>
			var global_debug={$debug_string};
			var global_mode="{$mode}";
			var global_locale="{$locale}";
			var global_lang_messages={$lang_messages};

			var global_paypal_currency="{$paypal_currency}";
			var global_currency_symbol="{$currency_symbol}";
			var global_auto_open_modal_product="{$auto_open_modal_product}";
			var global_paypal_purchase_unit_description="{$paypal_purchase_unit_description}";
			
			var global_products={$productsString};
		</script>

		<script src="/js/app.js"></script>
	</head>
	<body>
		$body_before
		<div id="app"></div>
		$body_after
	</body>
</html>
HTML;

	}


}


