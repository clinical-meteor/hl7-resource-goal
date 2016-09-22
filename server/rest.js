
JsonRoutes.Middleware.use(
    '/api/*',
    oAuth2Server.oauthserver.authorise()   // OAUTH FLOW - A7.1
);




JsonRoutes.add("get", "/fhir/Goal/:id", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Goal/' + req.params.id);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Goals.count.read": 1
      }});
    }

    var id = req.params.id;
    var goalData = Goals.findOne(id);
    delete goalData._document;
    process.env.TRACE && console.log('goalData', goalData);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: goalData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});



JsonRoutes.add("get", "/fhir/Goal", function (req, res, next) {
  process.env.DEBUG && console.log('GET /fhir/Goal', req.query);

  res.setHeader("Access-Control-Allow-Origin", "*");

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken || process.env.NOAUTH) {
    process.env.TRACE && console.log('accessToken', accessToken);
    process.env.TRACE && console.log('accessToken.userId', accessToken.userId);

    if (typeof SiteStatistics === "object") {
      SiteStatistics.update({_id: "configuration"}, {$inc:{
        "Goals.count.search-type": 1
      }});
    }

    var databaseQuery = {};
    
    process.env.DEBUG && console.log('databaseQuery', databaseQuery);
    process.env.DEBUG && console.log('Goals.find(id)', Goals.find(databaseQuery).fetch());

    // because we're using BaseModel and a _transform() function
    // Goals returns an object instead of a pure JSON document
    // it stores a shadow reference of the original doc, which we're removing here
    var goalData = Goals.find(databaseQuery).fetch();

    goalData.forEach(function(goal){
      delete goal._document;
    });

    JsonRoutes.sendResult(res, {
      code: 200,
      data: goalData
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
