export class UserInfoAuth {
  constructor(
    public userId: string,
    public realUserName: string,
    public loginUserName: string,
    public className: string,
    public majorName: string,
    public college: string
  ) {}
}
