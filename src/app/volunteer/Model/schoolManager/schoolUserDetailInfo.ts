// 从 SchoolManager  获取  当前已认证用户的详细信息
export class SchoolUserInfoDetailInfo {
  constructor(
    public userId: string,
    public realUserName: string,
    public loginUserName: string,
    public className: string,
    public majorName: string,
    public college: string
  ) {}
}
