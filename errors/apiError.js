class ApiError {
  constructor(
    message = 'An error occurred',
    statusCode = 500,
  ) {
    const body = JSON.stringify({ message });
    this.statusCode = statusCode;
    this.body = body;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }
}

module.exports = ApiError