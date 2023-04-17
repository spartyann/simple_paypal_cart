<?php

namespace App;

use Config\Config;

class App {

	public function run() {

		if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			$data = json_decode(file_get_contents("php://input"), true);
			
			$paypalResult = $data["paypalResult"] ?? null;
			$products = $data["products"] ?? null;
			$action = $data["action"] ?? null;

			if ($action == 'save_payment')
			{
				if (Config::$STORE_IN_DB) DB::save($products, $paypalResult);

				$this->jsonResponse(true);
			}
		}
		else
		{
			BootstrapCompiler::compileBootstrap();
			Page::print();
		}
	}

	private function jsonResponse($data)
	{
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($data);
	}



}

