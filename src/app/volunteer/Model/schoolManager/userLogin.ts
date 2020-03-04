export class UserLogin {
  constructor(
    public userId: string,
    public password: string,
    public validateCode: string,
    public preUrl: string,
    public loginUrl: string,
    public LoginViewState: string,
    public loginUserName: string
  ) {}
}
