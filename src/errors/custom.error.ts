export class CustomError extends Error {
  public readonly status: number

  constructor(status: number, msg: string) {
    super(msg)
    this.status = status
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
