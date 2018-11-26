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

router.get('/', (req, res) => res.send('Hello World from Custom routing!'))


router.get('/.well-known/openid-configuration', (req, res) =>  {
    res.json(
            {
                "issuer"
            :
                "https://wdawson.trexcloud.com",
                    "authorization_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/authorize",
                    "token_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/token",
                    "userinfo_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/userinfo",
                    "registration_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/clients",
                    "jwks_uri"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/keys",
                    "response_types_supported"
            :
                [
                    "code",
                    "id_token",
                    "code id_token",
                    "code token",
                    "id_token token",
                    "code id_token token"
                ],
                    "response_modes_supported"
            :
                [
                    "query",
                    "fragment",
                    "form_post",
                    "okta_post_message"
                ],
                    "grant_types_supported"
            :
                [
                    "authorization_code",
                    "implicit",
                    "refresh_token",
                    "password"
                ],
                    "subject_types_supported"
            :
                [
                    "public"
                ],
                    "id_token_signing_alg_values_supported"
            :
                [
                    "RS256"
                ],
                    "scopes_supported"
            :
                [
                    "openid",
                    "email",
                    "profile",
                    "address",
                    "phone",
                    "offline_access",
                    "groups"
                ],
                    "token_endpoint_auth_methods_supported"
            :
                [
                    "client_secret_basic",
                    "client_secret_post",
                    "client_secret_jwt",
                    "private_key_jwt",
                    "none"
                ],
                    "claims_supported"
            :
                [
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
                    "code_challenge_methods_supported"
            :
                [
                    "S256"
                ],
                    "introspection_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/introspect",
                    "introspection_endpoint_auth_methods_supported"
            :
                [
                    "client_secret_basic",
                    "client_secret_post",
                    "client_secret_jwt",
                    "private_key_jwt",
                    "none"
                ],
                    "revocation_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/revoke",
                    "revocation_endpoint_auth_methods_supported"
            :
                [
                    "client_secret_basic",
                    "client_secret_post",
                    "client_secret_jwt",
                    "private_key_jwt",
                    "none"
                ],
                    "end_session_endpoint"
            :
                "https://wdawson.trexcloud.com/oauth2/v1/logout",
                    "request_parameter_supported"
            :
                true,
                    "request_object_signing_alg_values_supported"
            :
                [
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
            })
})


// Works when first time redirect to app
router.get('/direct_redirect_to_app', (req, res) => {
    res.writeHead(302, {
    // 'Location': 'com.okta.appauth.android.example:/callback?code=o9nM3zgbZWwAw6SXoiNX&state=zzoQEENcSsuluQAzd-0Jhw'
    'Location': config.appUrl
})
res.end();
})


// Open link for first time to redirect and return 302 by default
router.get('/auth_process_user', (req, res) => {
    res.writeHead(302, {
    // 'Location': 'com.okta.appauth.android.example:/callback?code=o9nM3zgbZWwAw6SXoiNX&state=zzoQEENcSsuluQAzd-0Jhw'
    'Location': config.schema+"://"+config.domain+"/get_login_form"
})
res.end();
})

module.exports = router;


router.get('/get_login_form', (req, res) => {
    res.render('index', {page:'Home', menuId:'home'});
})


router.post('/login_via_form', (req, res) => {
    res.writeHead(302, {
    // 'Location': schema+"://"+domain+":"+port+"/second_redirect"
    'Location': config.appUrl
})
res.end();
})

router.post('/login_via_js', (req, res) => {
    res.json({
    "redirectUrl":config.schema+"://"+config.domain+"/first_redirect",
    "expiresAt": "2018-11-21T13:58:11.000Z",
    "status": "SUCCESS",
    "sessionToken": "20111RaiVigJhS6i1m_dgm8MlOJ-9x33JAvU88rpC7ZcNExMd1-kzeu",
    "_embedded": {
        "user": {
            "id": "00u4o9wncJE0LvgJt356",
            "passwordChanged": "2018-11-19T14:32:01.000Z",
            "profile": {
                "login": "imartsekha@lohika.com",
                "firstName": "Igor",
                "lastName": "Martsekha",
                "locale": "en",
                "timeZone": "America/Los_Angeles"
            }
        }
    }
});
})

// First redirect
router.get('/first_redirect', (req, res) => {
    res.writeHead(302, {
    // 'Location': schema+"://"+domain+":"+port+"/second_redirect"
    'Location': config.schema+"://"+config.domain+"/direct_redirect_to_app"
})
res.end();
})

module.exports = router