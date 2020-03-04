export class TodoInfoData {
  constructor(
    public volunteerType: number,
    public volunteerTypeStr: string,
    public volunteerActivityId: number,
    public volunteerActivityStr: string,
    public orgId: string,
    public orgName: string,
    public createTime: string,
    public weekValue: number,
    public weekName: string,
    public timeName: string,
    public isValid: boolean,
    public todoState: string
  ) {}
}
