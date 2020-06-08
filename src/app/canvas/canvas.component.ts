import { Component, OnInit } from "@angular/core";
import { COLORS } from "./constants";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit {
  public rows: number = 10;
  public board = [];
  constructor() {}

  ngOnInit() {
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
  }
}
