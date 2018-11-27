/**
 * Created by adventis on 11/23/18.
 */
var config ={}
config.port = process.env.PORT || 8080;

config.schema = "https"
config.domain = "redirect-mock-service.herokuapp.com"
config.appSchema = "net.openid.appauthdemo"
config.appUrl = config.appSchema+":/oauth2redirect";

module.exports = config