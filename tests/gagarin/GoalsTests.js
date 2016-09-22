describe('clinical:hl7-resources-goals', function () {
  var server = meteor();
  var client = browser(server);

  it('Goals should exist on the client', function () {
    return client.execute(function () {
      expect(Goals).to.exist;
    });
  });

  it('Goals should exist on the server', function () {
    return server.execute(function () {
      expect(Goals).to.exist;
    });
  });

});
