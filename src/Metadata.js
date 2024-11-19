var REQUIRED = { } // Marker for required parameters

function checkParameters(target, parameters) {
  const requiredParams = target.requiredParams  // Retrieve metadata from calling function
  
  if (!requiredParams) 
    return

  for (const [paramName, requirement] of Object.entries(requiredParams)) {
    if (requirement === REQUIRED) {
      if (!parameters.hasOwnProperty(paramName))
        throw new Error(`Required parameter missing: ${paramName}`)
      if (parameters[paramName] === undefined)
        throw new Error(`Required parameter undefined: ${paramName}`)
      if (parameters[paramName] === null)
        throw new Error(`Required parameter null: ${paramName}`)
    }
  }
}
