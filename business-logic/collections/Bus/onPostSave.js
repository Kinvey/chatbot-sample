function onPostSave(request, response, modules) {
    var req = modules.request;
    var msg = {
        op: 'create',
        data: response.body
    };
    if (request.method === 'PUT') {
        msg.op = response.body._kmd.ect === response.body._kmd.lmt ? 'create' : 'update';
    }
    req.post({
      uri : 'https://kls.kinvey.com/appdata/' + request.appKey + '/' + request.collectionName,
      json : msg
    }, function(error, res, body) {
      response.continue();
    });
}