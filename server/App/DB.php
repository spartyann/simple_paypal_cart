<?php

namespace App;

use Config\Config;

class DB {

	public static $CONNECTION = null;

	private static function getProduct(string $code)
	{
		foreach(Config::PRODUCTS() as $product) if ($product['code'] == $code) return $product;
		return null;
	}

	private static function getOption(array $product, string $code)
	{
		foreach($product['options'] as $option) if ($option['code'] == $code) return $option;
		return null;
	}



	public static function save(array $reqProducts = null, array $reqPaypalResult = null)
	{
		$products = [];

		// Security => Rebuild object
		foreach($reqProducts as $rp)
		{
			$product = self::getProduct($rp['code']);

			if ($product == null) // ERROR
			{
				self::logError('Error during saving. Product code not found: ' . $rp['code']);
				return;
			}

			$option = self::getOption($product, $rp['optionCode']);

			if ($option == null) // ERROR
			{
				self::logError('Error during saving. Option code not found: ' . $rp['optionCode']);
				return;
			}

			$ps = [
				'name' => $product['name'],
				'paypalName' => $product['paypal_name'] ?? null,
				'description' => $product['description'] ?? null,
				'image' => $product['image'] ?? null,
				'code' => $product['code'],

				'optionCode' => $option['code'],
				'optionName' => $option['name'] ?? null,
				'optionDescription' => $option['description'] ?? null,
				'optionPaypalName' => $option['paypal_name'] ?? null,

				'hasSingleOption' => count($product['options']) == 1,
				'quantity' => floatval($rp['quantity']),
				'price' => floatval($rp['price']),
				'isCustomPrice' => $rp['isCustomPrice'] == true,
				'total' => floatval($rp['total']),
				'detail' => [
					'product' => $product,
					'option' => $option,
					'customPrice' => floatval($rp['detail']['customPrice']),
				],
			];

			$products[] = $ps;
		}

		self::logInfo('Payment completed', json_encode([
			'products' => $products,
			'reqProducts' => $reqProducts,
			'reqPaypalResult' => $reqPaypalResult
		]));

		self::sql('INSERT INTO pp_purchases(products, paypal_result) VALUES (?, ?)', [
			json_encode($products),
			json_encode($reqPaypalResult)
		]);
		
	}
	

	public static function quote(string $string)
	{
		self::initDB();
		return '"' . mysqli_real_escape_string(self::$CONNECTION, $string) . '"';
	}


	public static function logError(string $msg, $data = null)
	{
		self::sql('INSERT INTO pp_log(type, msg, data) VALUES ("error", ?, ?)', [ $msg, json_encode($data) ]);
	}

	public static function logInfo(string $msg, $data = null)
	{
		self::sql('INSERT INTO pp_log(type, msg, data) VALUES ("info", ?, ?)', [ $msg, json_encode($data) ]);
	}


	public static function sql(string $sql, array $bindings = []){

		self::initDB();

		// Apply bindings

		if(count($bindings) > 0 && substr_count($sql, '?') === count($bindings))
		{
			$parts = explode("?", $sql);
			$sql = '';
			foreach($parts as $i => &$part)
			{
				$sql .= $part;
				if ($i < count($bindings)) $sql .= self::quote($bindings[$i]);
			}
		}


		// Run SQL
		$queryResult = \mysqli_query(self::$CONNECTION, $sql);

		if (is_bool($queryResult)) return $queryResult;

		if ($queryResult === false) 
		{
			self::logError("SQL error on request: " . $sql);
		}

		$res = mysqli_fetch_all($queryResult);

		if (is_array($res) == false) return [ $res ];

		return $res;
	}


	public static function initDB()
	{
		if (self::$CONNECTION == null)
		{
			// Create connection
			self::$CONNECTION = mysqli_connect(Config::$DB_HOST, Config::$DB_USER, Config::$DB_PASSWORD);
			mysqli_select_db(self::$CONNECTION, Config::$DB_DATABASE);

			// Init DB

			$tables = self::sql("SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE FROM  information_schema.TABLES WHERE TABLE_SCHEMA = '"
			 . Config::$DB_DATABASE . "'");

			
			if ($tables == null || count($tables) != 3)
			{
				self::sql("CREATE TABLE IF NOT EXISTS pp_migrations (
					id int(11) NOT NULL AUTO_INCREMENT,
					name varchar(30) NOT NULL,
					PRIMARY KEY (id)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

				self::sql("CREATE TABLE IF NOT EXISTS pp_log (
					id int(11) NOT NULL AUTO_INCREMENT,
					date datetime NOT NULL DEFAULT current_timestamp(),
					type varchar(30) NOT NULL,
					msg text NOT NULL,
					data mediumtext NOT NULL,
					PRIMARY KEY (id)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

				self::sql("CREATE TABLE IF NOT EXISTS pp_purchases (
					id int(11) NOT NULL AUTO_INCREMENT,
					date datetime NOT NULL DEFAULT current_timestamp(),
					products mediumtext NOT NULL,
					paypal_result mediumtext NOT NULL,
					PRIMARY KEY (id)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

				self::sql('INSERT INTO pp_migrations(id, name) VALUES (1, "init")');

			}
		}
	}
}
