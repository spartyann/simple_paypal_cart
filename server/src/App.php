<?php

namespace App;

use App\Config\Config;

class App {

	public function run() {

		if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			$data = json_decode(file_get_contents("php://input"), true);
			
			$paypalResult = $data["paypalResult"] ?? null;
			$products = $data["products"] ?? null;
			$action = $data["action"] ?? null;

			if ($action == 'add')
			{
				if (Config::$STORE_IN_DB) DB::save($products, $paypalResult);
			}
		}
		else
		{
			BootstrapCompiler::compileBootstrap();
			Page::print();
		}
	}


}

