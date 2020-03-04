export class DormitoryType {
  constructor(
    public name: string,
    public isOpen: boolean,
    public id: number,
    public gender: number,
    public isAllowGender: boolean,
    public createTime: string
  ) { }
}
