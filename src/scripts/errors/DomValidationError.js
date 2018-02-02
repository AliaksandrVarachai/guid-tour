export function DomValidationError(message) {
  this.message = message;
}

DomValidationError.prototype = Object.create(Error.prototype);
