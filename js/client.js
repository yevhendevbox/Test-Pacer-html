function signup(login, mail, pass, respcb) {
  respcb = respcb || console.log

  var checks = [
    { sub: 'login', is: /\W/,
      err: 'should only have latin letters, numbers and underscores' },
    { sub: 'login', not: /^.{3,16}$/,
      err: 'should be 3 to 16 characters long' },
    { sub: 'mail', not: emailRegExp,
      err: "that doesn't look like a valid e-mail" },
    { sub: 'pass', not: /./,
      err: 'empty password is not allowed' }
  ]
  var invalid
  if (!login&&!mail) invalid = 'login and mail could not be both empty'
  else if (!login&&mail)
    invalid = validate({mail, pass}, checks.filter(check=>check.sub!='login'))
  else if (login&&!mail)
    invalid = validate({login, pass}, checks.filter(check=>check.sub!='mail'))
  else invalid = validate({login, mail, pass}, checks)

  if (invalid) respcb(tellWhat(invalid))
  else signupReq(login, mail, pass, respcb)
}

function signupReq(login, mail, pass, respcb) {
  request('POST',
          `server.php?task=signup&login=${login}&mail=${mail}&pass=${pass}`,
          response=>signupRespHandl(response, respcb), console.log)
}

function signupRespHandl(response, respcb) {
  respcb = respcb || console.log

  try {
    response = JSON.parse(response)
    if (response.invalid) respcb(tellWhat(response.invalid))
    else respcb(response)
  }
  catch {
    response = response.trim()
    if (response.startsWith('<'))
      document.body.innerHTML = response
    else alert('Unexpected server response: '+response)
  }
}

function tellWhat(invalid) {
  if (typeof invalid == 'string') return invalid
  else return 'Error on input '+invalid[0]+': '+invalid[1]
}