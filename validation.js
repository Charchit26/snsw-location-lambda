// TODO: Add more validations for the address string to prevent injection attacks
exports.isAddressValid = (addressString) => {
  return !addressString.startsWith("'") && !addressString.endsWith("'")
}