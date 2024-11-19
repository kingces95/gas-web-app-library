const ERROR_PROPERTIES = ['name', 'message', 'stack'];
const HTTP_RESPONSE_PROPERTIES = ['getContentText', 'getResponseCode', 'getHeaders'];

let _isDevCached;

function isDevelopment() {
  if (_isDevCached === undefined) {
    const url = ScriptApp.getService().getUrl();
    _isDevCached = url.includes('/dev');
  }
  return _isDevCached;
}

function instanceLike(object, methodNames) {
  // Ensure the object has all properties specified in methodNames
  return methodNames.every(method => 
    typeof object[method] === 'function' || 
    typeof object[method] !== 'undefined');
}

