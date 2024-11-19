// Retrieve configuration values directly from the active sheet, throwing errors if not found
function getConfigValue(key) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const config = Object.fromEntries(data);
  if (!config[key]) throw new Error(`Configuration key '${key}' not found`);
  return config[key];
}

// Retrieve all configuration values as a key-value pair object
function getConfig() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  return Object.fromEntries(data);
}