import { Component, OnInit } from '@angular/core';
import { allLevels } from 'src/AllLevels';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

  private allLevels: any[];

  constructor() { 
    this.allLevels = allLevels;
  }

  ngOnInit() {
  }

}
