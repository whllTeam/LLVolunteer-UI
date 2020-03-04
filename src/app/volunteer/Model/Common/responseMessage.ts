export class ResponseMessage<T> {
  constructor(
    public responseCode: number,
    public message: string,
    public stackTrace: string,
    public success: boolean,
    public data: T
  ) {}
}
