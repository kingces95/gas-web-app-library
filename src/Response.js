
// Utility function for creating JSON responses
function createTypedResponse(result, type) {
  return ContentService.createTextOutput(result).setMimeType(type)
}

function createJsonResponse(result) {
  return createTypedResponse(JSON.stringify(result), ContentService.MimeType.JSON)
}

function createTextResponse(result) {
  return createTypedResponse(result, ContentService.MimeType.TEXT)
}

function createHtmlResponse(result) {
  return HtmlService.createHtmlOutput(result);  
}

function createProxyResponse(result) {
    const contentType = result.getHeaders()['Content-Type'] || 'text/plain'

    // Return as JSON if the response is JSON, else as text
    if (contentType.includes('application/json'))
      return createJsonResponse(JSON.parse(result.getContentText()))

    // Return as JSON if the response is JSON, else as text
    if (contentType.includes('application/html'))
      return createHtmlResponse(result)

    return createTextResponse(result.getContentText())
}

function createResponse(result) {

  // If result is a HTTPResponse (from UrlFetchApp), extract its content as text
  if (instanceLike(result, HTTP_RESPONSE_PROPERTIES))
    return createProxyResponse(result)

  // Handle standard cases of returning JSON data as an object or text directly
  if (typeof result === 'object') 
    return createJsonResponse(result)

  return createHtmlResponse(result)
}

function createErrorResponse(error) {
  let errorMessage
  let errorDetails = ""

  if (instanceLike(error, ERROR_PROPERTIES)) {
    // Handle Error object with message and stack trace
    errorMessage = error.message || "An unknown error occurred."
    errorDetails = error.stack || ""

  } else if (typeof error === "string") {
    // Handle string message directly
    errorMessage = error

  } else if (typeof error === "string") {
    // Handle string message directly
    errorMessage = "A string was thrown."
    errorDetails = error

  } else if (typeof error === "object") {
    // Handle string message directly
    errorMessage = `An object (${typeof error}) was thrown.`
    errorDetails = JSON.stringify(error)

  } else {
    // Default for unexpected types
    errorMessage = "An unknown error occurred."
  }

  // Build error response JSON
  const errorResponse = {
    error: errorMessage.slice(0, 1000),
    details: errorDetails.slice(0, 1000)
  }

  // Return JSON formatted response
  return createJsonResponse(errorResponse)
}

