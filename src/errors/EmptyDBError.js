class EmptyDBError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmptyDBError';
  }
}

export default EmptyDBError;
