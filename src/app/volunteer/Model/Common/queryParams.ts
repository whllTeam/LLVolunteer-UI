export class QueryParameters {
  constructor(
    public pageIndex: number,
    public pageSize: number,
    public orderBy: string,
    public Fields: string
  ) {}
}
