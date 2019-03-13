function request(type, url, cb, failcb) {
  failcb = failcb || (()=>{})
  const xhr = new XMLHttpRequest()
  xhr.open(type, url)
  xhr.timeout = 30000
  xhr.ontimeout = () => failcb(`${type} ${url} timed out`)
  xhr.onerror   =  e => failcb(`${type} ${url} produced ${e}`)
  xhr.onload    = () => {
    if (cb) {
      if (xhr.status >= 200 && xhr.status < 400) {
        if (!xhr.response.startsWith('<?php')) {
          if (xhr.response !== '') cb(xhr.response)
          else cb() && failcb(`${type} ${url} response was empty`)
        }
        else failcb(`${type} ${url} php-code returned instead of response`)
      }
      else cb() && failcb(`${type} ${url
        } request.status is ${xhr.status} ${xhr.statusText}`)
    }
  }
  xhr.send()
};