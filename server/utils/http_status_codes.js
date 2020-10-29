
/// HTTP Status Codes
/// Check https://www.restapitutorial.com/httpstatuscodes.html

const informational = {
    continue: 100,
    switchingProtocols: 101,
    processing: 102,
};

const success = {
    ok: 200,
    created: 201,
    accepted: 202,
    nonAuthorativeInformation: 203,
    noContent: 204,
    resetContent: 205,
    partialContent: 206,
    multiStatus: 207,
    IMUsed: 226,
};

const redirection = {
    multipleChoices: 300,
    movedPermanently: 301,
    found: 302,
    seeOther: 303,
    notModified: 304,
    useProxy: 305,
    unused: 306,
    temporaryRedirect: 307    
};

const clientError = {
    badRequest: 400,
    unauthorized: 401,
    paymentRequired: 402,
    forbidden: 403,
    notFound: 404,
    methodNotAllowed: 405,
    notAcceptable: 406,
    requestTimeout: 408, 
    conflict: 409,
    gone: 410,
    lenghRequired: 411,
    preconditionFailed: 412,
    unsupportedMediaType: 415,
    upgradeRequired: 426,
    requestHeadersFieldsTooLarge: 431,
};

const serverError = {
    internalServerError: 500,
    notImplemented: 501,
    badGateway: 502,
    serviceUnavailable: 503,
    gatewayTimeout: 504,
    httpVersionNotSupported: 505,
    insufficientStorage: 507,
    loopDetected: 508,
    notExtended: 510,
    networkAuthenticationRequired: 511,
};

module.exports = {
    informational,
    success,
    redirection,
    clientError,
    serverError
};