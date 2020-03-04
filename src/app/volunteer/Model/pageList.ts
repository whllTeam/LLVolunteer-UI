export class PageList<T> {
  constructor(
    public hasNext: boolean,
    public hasPrevious: boolean,
    public pageCount: number,
    public pageIndex: number,
    public pageSize: number,
    public totalItemsCount: number,
    public data: T[]
  ) {}
}
