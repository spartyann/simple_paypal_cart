<?php

namespace App\Config;

class Lang {

	public static function MESSAGES() {

		$messages = [
			'fr' => [
				'title' => 'Paiement',
				'cart.no_product' => 'Il n\'y a aucun article',
				'cart.total' => 'Total:',
				'btn.product.add' => 'Ajouter un article',
				'modale.product.title' => 'Choisissez un article',
				'modale.product.quantity' => 'Quantité:',
				'modale.product.total' => 'Total:',
				'modale.product.btn.choose_product' => 'Choisir cet article',
				'modale.product.btn.choose_option' => 'Choisir une option',
				'modale.product.option.choose' => 'Choisissez une option:',
				'modale.product.btn.cancel' => 'Annuler',
				'modale.product.btn.previous' => 'Précédent',
				'modale.product.btn.add' => 'Ajouter',

				'paid.confirmation' => 'Merci pour votre achat !',
			]
		];

		foreach(Config::LANG_MESSAGES_OVERRIDE() as $lang => $ovmsgs)
		{
			foreach ($ovmsgs as $key => $msg) $messages[$lang][$key] = $msg;
		}


		return $messages;
	}
	
}

