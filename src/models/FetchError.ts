export default class FetchError extends Error {
  response: Response

  constructor(response: Response) {
    super(response.statusText)

    this.response = response
  }

  get status(): number {
    return this.response.status
  }
}