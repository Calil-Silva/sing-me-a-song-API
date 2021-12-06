class IsCreatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IsCreatedError';
  }
}

export default IsCreatedError;
