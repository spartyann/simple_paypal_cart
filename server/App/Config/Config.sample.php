<?php

namespace App\Config;

class Config {

	public static $DEBUG = true;

	public static $MODE = 'cart'; // 'cart' or 'link'

	public static $ADMIN_PASSORD = '<define password>';

	public static $LOCALE = 'fr';
	public static function LANG_MESSAGES_OVERRIDE() { return [
		'fr' => [
			//'title' => 'Mon titre custom'
		]
	]; }

	public static $PAYPAL_CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	

	public static $PAYPAL_CURRENCY = 'EUR';
	public static $PAYPAL_PURCHASE_UNIT_DESCRIPTION = 'Main Cart';

	public static $CURRENCY_SYMBOL = '€';

	public static $AUTO_OPEN_MODAL_PRODUCT = true;

	public static function PAGE_TITLE() { return 'Paiement'; }

	public static function BODY_BEFORE() { return '<div class="p-4">'; }

	public static function BODY_AFTER() { return '</div>'; }

	public static function CUSTOM_STYLE() { return '

	'; }

	public static $STORE_IN_DB = true;
	public static $DB_HOST = 'spc-db';
	public static $DB_USER = 'spc';
	public static $DB_PASSWORD = 'yuj4f6ghj514d6fj516gh51sdgh';
	public static $DB_DATABASE = 'spc';


	public static $BOOTSTRAP_VARIABLES = 
	[
		// Primary Color
		'primary' => "#0038d1"
	];

	public static function PRODUCTS()
	{
		return [
			[
				'code' => 'SHIATSU',
				'name' => 'Shiatsu',
				'paypal_name' => 'Shiatsu',
				'description' => 'Séance de Shiatsu',
				'image' => '/images/shiatsu.jpg',
				'options' => [
					[
						'code' => 'standard',
						'name' => 'Tarif pour 1 séance',
						'paypal_name' => '',
						'price' => 60,
						'link' => 'https://buy.stripe.com/test_00g6qegAAcxh9kQ8wy',
					]
				]
			],
			
			[
				'code' => 'REIKI',
				'name' => 'Reiki',
				'paypal_name' => 'Reiki',
				'description' => 'Séance de Reiki',
				'image' => '/images/reiki.jpg',
				'options' => [
					[
						'code' => 'standard',
						'name' => 'Séance standard',
						'price' => 50,
						'link' => 'https://buy.stripe.com/test_00gbKyfww54P54A289',
					],
					[
						'code' => 'premiere',
						'name' => 'Première séance',
						'description' => 'Ce tarif est valable pour 1 personne avant le 31/03/2023',
						'link' => 'https://buy.stripe.com/test_00gbKyfww54P54A289',
						'price' => 30,
					]
				]
			],
			[
				'code' => 'BON',
				'name' => 'Bon cadeau',
				'paypal_name' => 'Bon cadeau',
				'description' => 'Offrez à une personne une séance de Reiki ou de Shiatsu',
				'image' => '/images/gift.jpg',
				'options' => [
					[ 'price' => 50, 'name' => "Bon cadeau à 50 € (tarif standard Reiki)", 'code' => 's50' ],
					[ 'price' => 60, 'name' => "Bon cadeau à 60 € (tarif standard Shiatsu)", 'code' => 's60' ],
					[ 'price' => 30, 'name' => "Bon cadeau à 30 €", 'code' => 's30' ],
					[ 'price' => 40, 'name' => "Bon cadeau à 40 €", 'code' => 's40' ],
					[
						'code' => 'custom',
						'name' => 'Montant personnalisé',
						'price' => null, // Custom
						'force_quantity' => 1,
						'link' => 'https://buy.stripe.com/test_dR6cOCessdBl8gMcMM',
					],
				]
			],
			[
				'code' => 'CUSTOM',
				'name' => 'Montant personnalisé',
				'paypal_name' => 'Montant personnalisé',
				'description' => '',
				'image' => '/images/shiatsu.jpg',
				'options' => [
					[
						'code' => 'custom',
						'name' => '',
						'price' => null,
						'force_quantity' => 1
					]
				]
			],
		];
	}

}

