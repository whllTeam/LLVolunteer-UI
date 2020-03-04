export class TodoInfoRequest {
  constructor(
    public userName: string,
    public isCurrentWeek: boolean,
    public volunteerType: number,
    public pageIndex: number,
    public pageSize: number
  ) {}
}
