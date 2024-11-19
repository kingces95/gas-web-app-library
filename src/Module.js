const LIBRARY=this

function importTo(target) {
  // Get all properties of this (the library's scope)
  Object.keys(LIBRARY).forEach((key) => {
    // Check if the property is a function
    if (typeof LIBRARY[key] === 'function') {
      // Bind the function to the provided target scope and assign it
      target[key] = LIBRARY[key]
    }
  })

  target.doGet = LIBRARY.doGet.bind(target)
}
