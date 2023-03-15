<?php

namespace App;

class App {

	public function run() {

		BootstrapCompiler::compileBootstrap();

		Page::print();
	}


}

