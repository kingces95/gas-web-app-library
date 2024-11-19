function handleReset(e) {
  this.PropertiesService.getUserProperties().deleteAllProperties();
  this.PropertiesService.getScriptProperties().deleteAllProperties();
  this.CacheService.getScriptCache().removeAll([]);
  this.CacheService.getUserCache().removeAll([]);
  this.CacheService.getDocumentCache().removeAll([]);
}

function handleGetConfig(e) {
  if (!isDevelopment())
    return
    
  return getConfig()
}

function handleGetEndpoint(e) {
  return { endpoint: ScriptApp.getService().getUrl() }
}

// Get Script ID
function handleGetScriptId() {
  return { scriptId: ScriptApp.getScriptId() };
}

// Get Execution Mode (production or development)
function handleGetExecutionMode() {
  isDevelopment() ? 'development' : 'production';
  return { executionMode: mode };
}

// Get User Email (if authorized)
function handleGetUserEmail() {
  const email = Session.getActiveUser().getEmail() || 'Not authorized';
  return { userEmail: email };
}

// Get Script Properties
function handleGetScriptProperties() {
  const properties = this.PropertiesService.getScriptProperties().getProperties();
  return { scriptProperties: properties };
}

function handleGetUserProperties() {
  const properties = this.PropertiesService.getUserProperties().getProperties();
  return { userProperties: properties };
}

