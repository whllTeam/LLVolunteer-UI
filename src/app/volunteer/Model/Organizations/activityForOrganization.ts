import { ImageInfo } from '../ImageInfo';

export class ActivityForOrganization {
  constructor(
    public activityName: string,
    public activityDes: string,
    public startTime: string,
    public endTime: string,
    public desImg: ImageInfo,
    public signMaxNum: number,
    public organizationInfoId: number,
    public activityState: number,
    public canSignActivity: boolean,
    public activityStateTypeStr: string,
    public id: number
  ) {}
}
