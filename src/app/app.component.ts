import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';
import { multi } from './main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'profile-page';
  public dataService: DataService;
  public visitorInfo = {};
  public visitorActivity = {};

  multi: any[];
  xAxisLabel = 'Stall';
  yAxisLabel = 'Time Spent';
  colorScheme = {
    domain: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20'
    ]
  };

  constructor(dataService: DataService) {
    this.dataService = dataService;
    Object.assign(this, { multi })
  }
  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {
    this.getVisitorInfo();
  }

  getVisitorInfo() {
    const requestData = {
      url: "/1",
    }
    this.dataService.get(requestData).subscribe(response => {
      if (response.responseCode === "SUCCESSFUL") {
        this.visitorInfo = response
      }
    }, (err => {
      console.log(err)
    }))
  }
}
