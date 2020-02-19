import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';
import { multi } from './main';
import { Subscription} from 'rxjs';
import { interval } from 'rxjs';

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
  public showMessage = true;
  subscription: Subscription;
  timer = interval(10000);

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
  }

  ngOnInit() {
    this.getVisitorInfo()
    //calling get visitor info for every 10 seconds
    this.subscription = this.timer.subscribe(val => this.getVisitorInfo());
  }

  onSelect(event) {
    console.log(event);
  }

  getVisitorInfo() {
    const requestData = {
      url: "/1",
    }
    this.dataService.get(requestData).subscribe(response => {
      console.log("visitor info ", response);
      if (response.responseCode === "SUCCESSFUL") {
        this.showMessage = false;
        this.visitorInfo = response;
      } else {
        this.showMessage = true;
      }
    }, (err => {
      console.log(err)
    }))

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
