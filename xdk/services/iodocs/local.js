(function (credentials) {
  var exports = {};
  exports.methodA1 = function (params) {
    var url = 'http://example.api/methodA1?api_key_var_name=' + credentials.apiKey;
    return $.ajax({url: url});
  };
  
  exports.methodA1User = function(params) {
    var url = 'http://example.api/methodA1/user/' + params.UserId;
    delete params.UserId;
    if (params) url = url + '?' + $.param(params);
    return $.ajax({url: url, type: 'GET'});
  };
  
  return exports;
})