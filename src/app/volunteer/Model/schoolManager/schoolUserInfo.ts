// 查询volunteerManager 服务  当前用户是否已进行信息认证

export class SchoolUserInfo {
  constructor(
    public userName: string,
    public schoolUserName: string,
    public userId: string,
    public isAuthorize: boolean
  ) {}
}
