<?php

list ($login, $mail, $pass) = request('login', 'mail', 'pass');

$subj = array('login'=>$login, 'mail'=>$mail, 'pass'=>$pass);
$checks = array(
  check_is('should only have latin letters, numbers and underscores',
           '/\W/', 'login'),
  check_not('should be 3 to 16 characters long',
            '/^.{3,16}$/', 'login'),
  check_not("that doesn't look like a valid e-mail",
            $emailRegExp, 'mail'),
  check_not('should be 3 to 16 characters long',
            '/./', 'pass')  );

if (!$login&&!$mail) $invalid = 'login and mail could not be both empty';
elseif (!$login&&$mail)
  $invalid = validate(sub_less($subj, 'login'), check_less($checks, 'login'));
elseif ($login&&!$mail)
  $invalid = validate(sub_less($subj, 'mail'), check_less($checks, 'mail'));
else $invalid = validate($subj, $checks);

if ($invalid)
  $response['invalid'] = $invalid;
else {
  $db = mysqli_connect('localhost', 'root', '', 'func-play001')
    or exit ('connection failed');


}

// $response['ok'] =
//   "going to process login: $login, mail: $mail, pass: $pass";



?>