<?php

namespace App;

use ScssPhp\ScssPhp\Compiler;

class App {

	public function run() {

		$this->compileBootstrap();

		Page::print();
	}

	private function compileBootstrap()
	{
		$destCssFile = __DIR__ . '/public/css/bootstrap.css';

		$bsVariables = Config::$BOOTSTRAP_VARIABLES;
		$checkMarker = '/* ' . json_encode($bsVariables) . ' */';

		$doCompile = true;


		if (file_exists($destCssFile))
		{
			try {
				$fn = fopen($destCssFile,"r");
				$firstLine = fgets($fn, 1024);
				if (trim($firstLine) == trim($checkMarker)) $doCompile = false;
			} finally {
				fclose($fn);
			}
		}

		if ($doCompile)
		{
			$compiler = new Compiler();

			$bsFile = __DIR__ . '/assets/bootstrap/scss/bootstrap.scss';

			$scssVariables = '';
			foreach($bsVariables as $varName => $varValue)
			{
				$scssVariables .= '$' . $varName . ': ' . $varValue . ";\n";
			}

			$css = $compiler->compileString($scssVariables . file_get_contents($bsFile), $bsFile)->getCss();

			$css = $checkMarker . "\n\n" . $css;

			file_put_contents($destCssFile, $css);
		}

	}
}

