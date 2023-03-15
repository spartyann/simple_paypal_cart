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

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
  
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>

        <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

		<script src="$vueUrl"></script>
		
   		<script src="/js/app.js"></script>

<style>
    .tbl,.tbl-100{display:table !important}.tbl-100{width:100%}.tr{display:table-row}.td,.td-100{vertical-align:top;display:table-cell}.td-100{width:100%}.p-10{padding:10px}.p-20{padding:20px}.p-30{padding:30px}.vat{vertical-align:top}.vam{vertical-align:middle}.vab{vertical-align:bottom}.fb-card{padding:0 0 10px 0;box-shadow:1px 1px 14px 0px rgba(0, 0, 0, 0.16);margin-bottom:20px}html,body,body>.body-wrapper,body>.body-wrapper>.body-innerwrapper{height:100%}#sp-main-body{min-height:calc(100%  -   200px)}.sp-menu-item:hover{background-color:#f7f7f7 !important}.sp-menu-item.current-item{background-color:#edf3f0 !important}.sp-menu-item.current-item a{font-weight:bold !important;color:#145834 !important}.sp-megamenu-parent>li:last-child>a{padding:0 15px 0 15px}.sp-page-title{background:#145834;padding:17px 0}.convertforms .cf-content-wrap,.convertforms .cf-form-wrap{padding-left:0}.icon-rounded{color:#145834;font-size:20px;width:50px;height:50px;border:1px solid #145834;border-radius:25px;line-height:50px;text-align:center;vertical-align:middle;margin-top:5px}.fb-pratique img{max-height:180px}.fb-pratique a{color:inherit}.home-pratique-titre .sppb-addon-title{white-space:nowrap}.home-pratique-titre .sppb-addon-title img{height:1.2em;display:inline-block}
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

