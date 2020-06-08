import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
public rows:Array<String>=[];
  constructor() { }

  ngOnInit() {
    for(let i =0;i<25;i++)
    {
this.rows.push(' ');
    }
  }

}
