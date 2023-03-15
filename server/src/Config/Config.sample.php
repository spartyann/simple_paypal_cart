<?php

namespace App\Config;

class Config {

	public static $DEBUG = true;

	public static $PAYPAL_CLIENT_ID = '';

	public static function PAGE_TITLE() { return 'Paiement'; }

	public static function BODY_BEFORE() { return '<div class="p-4">'; }

	public static function BODY_AFTER() { return '</div>'; }

	public static function CUSTOM_STYLE() { return ''; }
	
	
	public static $BOOTSTRAP_VARIABLES = 
	[
		// Primary Color
		'primary' => "#0038d1"
	];

	public static function PRODUCTS()
	{
		return [

		];
	}

}

