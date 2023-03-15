<?php

use App\App;

require_once(dirname(dirname(__DIR__)) . '/vendor/autoload.php');

$app = new App();

$app->run();
