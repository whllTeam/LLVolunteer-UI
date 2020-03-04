import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../Service/volunteer.service';
import { PageInfo } from '../Model/Essay/pageInfo';
import { QueryParameters } from '../Model/Common/queryParams';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  fileServer = environment.apis.fileUrl;
  pageInfos: PageInfo[];
  pageIndex = 1;
  pageCount = 0;
  totalCount = 0;
  load = true;
  constructor(private volunteerService: VolunteerService) { }

  ngOnInit() {
    this.loadData(1);
  }

  loadData(index: number): void {
    this.load = true;
    let $this = this;
    let query = new QueryParameters(index, 10, '', '');
    this.volunteerService.getIndexData(query)
      .subscribe(value => {
          $this.pageIndex = value.pageIndex;
          $this.pageCount = value.pageCount;
          $this.pageInfos = value.data;
          this.load = false;
    });
  }

  getImageSrc(path: string) {
    return `${this.fileServer}/${path}`;
  }
}
