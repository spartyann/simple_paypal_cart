<?php

namespace App;

use App\Config;

class Page {

	public static function print() {

		$title= Config::$PAGE_TITLE;
		$bodyBefore = Config::$BODY_BEFORE;
		$bodyAfter = Config::$BODY_AFTER;

		$vueUrl = Config::$DEBUG ? 'https://unpkg.com/vue@3.2.47/dist/vue.global.js' : 'https://unpkg.com/vue@3.2.47/dist/vue.global.prod.js';

		echo <<<HTML
<!doctype html>
<html lang="fr-fr" dir="ltr">
	<head>
		<title>$title</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">-->

		<link href="/css/bootstrap.css" rel="stylesheet" />
		<link href="/css/app.css" rel="stylesheet" />

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>

        <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

		<script src="$vueUrl"></script>
		
   		<script src="/js/app.js"></script>


		<style>
			:root{
				//--bs-primary: #0d6e00 !important;
			}

			.btn-primary{
				//--bs-btn-bg: #0d6e00 !important;
			}
		</style>
	</head>
	<body>
		$bodyBefore
		<div id="app"></div>
		$bodyAfter
	</body>
</html>
HTML;

	}


}

