import { Component, OnInit } from '@angular/core';
import {COLORS} from './constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  private sub: any;
  id: number;
  public rows: number=5;
  public board=[];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
    this.setBoard();
  }
  setBoard(): void {
    this.board = [];

    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = false;
      }
    }
}
setColors(col: number, row: number): string {
 

  return COLORS.BOARD;
};

}