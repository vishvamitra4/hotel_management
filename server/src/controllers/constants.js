module.exports = {
    ERROR_LIST : {
        "101": { statusCode: 400, errorCode: "101", codeMsg: "API_KEY_MISSING", message: "Api Key not found in authentication header or query string" },
        "102": { statusCode: 400, errorCode: "102", codeMsg: "AUTH_FAILED", message: "Authentication required" },
        "201": { statusCode: 400, errorCode: "201", codeMsg: "DATA_VALIDATION_FAILED", message: "Invalid input data provided" },
        "301": { statusCode: 400, errorCode: "301", codeMsg: "DATA_SAVING_FAILED", message: "Data saving failed" },
        "302": { statusCode: 400, errorCode: "302", codeMsg: "DELETION_FAILED", message: "Resource deletion failed" },
        "400": { statusCode: 400, errorCode: "400", codeMsg: "ACCOUNT_DISABLED", message: "Account is disabled" },
        "403": { statusCode: 403, errorCode: "403", codeMsg: "FORBIDDEN", message: "Permission to the resource is not provided." },
        "404": { statusCode: 404, errorCode: "404", codeMsg: "NOT_FOUND", message: "Resource not found" },
        "502": { statusCode: 502, errorCode: "502", codeMsg: "BAD_GATEWAY", message: "Bad Gateway" }
    }
};