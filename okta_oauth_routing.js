/**
 * Created by adventis on 11/23/18.
 */

var express = require('express');
var router = express.Router();
const config = require('./config')


//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => res.send('Hello World from Okta oauth routing!'))


router.get('/.well-known/openid-configuration', (req, res) => {
    res.json(
        {
            "issuer":config.schema+"://"+config.domain,
            "authorization_endpoint": config.schema+"://"+config.domain+ "/oauth2/v1/authorize",
            "token_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/token",
            "userinfo_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/userinfo",
            "registration_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/clients",
            "jwks_uri": config.schema+"://"+config.domain+"/oauth2/v1/keys",
            "response_types_supported": [
                "code",
                "id_token",
                "code id_token",
                "code token",
                "id_token token",
                "code id_token token"
            ],
            "response_modes_supported": [
                "query",
                "fragment",
                "form_post",
                "okta_post_message"
            ],
            "grant_types_supported": [
                "authorization_code",
                "implicit",
                "refresh_token",
                "password"
            ],
            "subject_types_supported": [
                "public"
            ],
            "id_token_signing_alg_values_supported": [
                "RS256"
            ],
            "scopes_supported": [
                "openid",
                "email",
                "profile",
                "address",
                "phone",
                "offline_access",
                "groups"
            ],
            "token_endpoint_auth_methods_supported": [
                "client_secret_basic",
                "client_secret_post",
                "client_secret_jwt",
                "private_key_jwt",
                "none"
            ],
            "claims_supported": [
                "iss",
                "ver",
                "sub",
                "aud",
                "iat",
                "exp",
                "jti",
                "auth_time",
                "amr",
                "idp",
                "nonce",
                "name",
                "nickname",
                "preferred_username",
                "given_name",
                "middle_name",
                "family_name",
                "email",
                "email_verified",
                "profile",
                "zoneinfo",
                "locale",
                "address",
                "phone_number",
                "picture",
                "website",
                "gender",
                "birthdate",
                "updated_at",
                "at_hash",
                "c_hash"
            ],
            "code_challenge_methods_supported": [
                "S256"
            ],
            "introspection_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/introspect",
            "introspection_endpoint_auth_methods_supported": [
                "client_secret_basic",
                "client_secret_post",
                "client_secret_jwt",
                "private_key_jwt",
                "none"
            ],
            "revocation_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/revoke",
            "revocation_endpoint_auth_methods_supported": [
                "client_secret_basic",
                "client_secret_post",
                "client_secret_jwt",
                "private_key_jwt",
                "none"
            ],
            "end_session_endpoint": config.schema+"://"+config.domain+"/oauth2/v1/logout",
            "request_parameter_supported": true,
            "request_object_signing_alg_values_supported": [
                "HS256",
                "HS384",
                "HS512",
                "RS256",
                "RS384",
                "RS512",
                "ES256",
                "ES384",
                "ES512"
            ]
        }
    )
})

module.exports = router