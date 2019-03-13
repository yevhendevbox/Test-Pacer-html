<?php

function request() {
  foreach (func_get_args() as $arg) $values[] = $_REQUEST[$arg];
  return $values;
}

require "validate.php";
sleep(1);

switch ($_REQUEST['task']) {
  case 'signup': {
    require 'signup.php';
  } break;
}

if (isset($response)) echo json_encode($response);


?>