_ = this

// Main GET handler with reflection-based dispatch
function doGet(e) {
  try {
    const action = e.parameter.action
    if (!action) 
      throw Error('Missing action parameter')

    // Construct the function name for the handler
    const actionName = `handle${action.charAt(0).toUpperCase() + action.slice(1)}`

    var func = this[actionName] || _[actionName]

    // Check if the function exists in the global scope and is a function
    if (typeof func !== 'function') 
      throw Error(`No such action: ${action} (${actionName})`)

    // Do argument checking (if the function has metadata)
    checkParameters(func, e.parameter)

    // Invoke the handler function dynamically
    var response = func.call(this, e) || { }

    // Format HTTP response 
    return createResponse(response)

  } catch (error) {
    return createErrorResponse(error)
  }
}
