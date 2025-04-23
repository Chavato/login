export class EnvironmentVariableMissing extends Error {
  statusCode: number;

  constructor(variableName: string, statusCode: number = 500) {
    super(`${variableName} environment variable is missing`);
    this.statusCode = statusCode;
  }
}
