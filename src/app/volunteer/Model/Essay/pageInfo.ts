import { ImageInfo } from '../ImageInfo';


export class PageInfo {
  constructor(
    public publishName: string,
    public title: string,
    public description: string,
    public content: string,
    public organizationInfoId: number,
    public createTime: string,
    public id: number,
    public pageImgs: ImageInfo[]
  ) {}
}
