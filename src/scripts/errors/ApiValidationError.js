export function ApiValidationError() {
  this.message = 'Load of Guided Tour config failed or the API host value is not specified.';
}

ApiValidationError.prototype = Object.create(Error.prototype);
