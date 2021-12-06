class IsDeletedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IsDeletedError';
  }
}

export default IsDeletedError;
