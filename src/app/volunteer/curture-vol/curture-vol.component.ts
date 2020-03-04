import { Component, OnInit } from '@angular/core';
import { SignActivityNotes } from '../Model/Common/signActivityNotes';
import { CurtureService } from '../Service/curture.service';

@Component({
  selector: 'app-curture-vol',
  templateUrl: './curture-vol.component.html',
  styleUrls: ['./curture-vol.component.css']
})
export class CurtureVolComponent implements OnInit {

  signActtivityNotes: SignActivityNotes[];
  constructor(
    private curtureService: CurtureService
  ) { }

  ngOnInit() {
    this.curtureService.getActivityNotes()
      .subscribe( value => {
        this.signActtivityNotes = value;
      });
  }
  getNotesStr(note: SignActivityNotes): string {
    let str = `${note.userName}${note.action ? '报名' : '取消报名'}${note.weekInfo}${note.detailTimes}
      ${note.typeStr}${note.volunteerName}活动--------------------${note.createTime}`;
    return str;
  }
}
