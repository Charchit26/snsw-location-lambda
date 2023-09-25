class ClientError {
  constructor(
    message = 'An error occurred',
    statusCode = 400,
  ) {
    const body = JSON.stringify({ message });
    this.statusCode = statusCode;
    this.body = body;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}

module.exports = ClientError