import { Component, OnInit } from '@angular/core';

import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(
    private leaderservice: LeaderService ) { }

  ngOnInit() {
    // 4. Exercise (Instructions): Angular and Promise Part 1
    // this.leaders = this.leaderservice.getLeaders();
    this.leaderservice.getLeaders()
    .then(leaders => this.leaders = leaders);
  }

}
