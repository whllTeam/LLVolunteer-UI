export class SignActivityNotes {
  constructor(
    public userName: string,
    public action: number,
    public type: number,
    public createTime: string,
    public volunteerName: string,
    public weekInfo: string,
    public detailTimes: string,
    public typeStr: string,
    public organizationName: string
  ) {}
}
