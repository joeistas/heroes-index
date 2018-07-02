export default class NotFoundError extends Error {
  constructor(message: string, public objectNotFound: string) {
    super(message)

  }
}
