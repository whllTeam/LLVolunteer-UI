export class SignQuery {
  constructor(
    public userName: string,
    public startTime: string,
    public endTime: string,
    public isSign: number,
    public weekId: number,
    public timeId: number,
    public volunteerTypeId: number
  ) {}
}
