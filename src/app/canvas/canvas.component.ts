import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { COLORS, BOARD_SIZE } from "./constants";
import { BROWSER_ANIMATIONS_PROVIDERS } from "@angular/platform-browser/animations/src/providers";
import { LevelService } from "../services/levels.service";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
})
export class CanvasComponent implements OnInit {
  allLevels: {
    level: number;
    "target-moves": number;
    positions: {
      man: number[];
      boxes: { 1: number[]; 2: number[] };
      target: { 1: number[]; 2: number[] };
    };
    grid: number[][];
  }[];

  id: number;
  public rows: number = 5;
  public board = [];

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService
  ) {
    this.allLevels = this.levelService.getAllLevels();
  }

  public x = 0;
  public y = 0;
  public a = 2;
  public b = 1;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });
    this.setBoard();
  }
  setBoard(): void {
    this.board = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        this.board[i][j] = false;
      }
    }
    this.board[0][0] = true;
    this.board[this.a][this.b] = true;
  }
  setColors(col: number, row: number): string {
    if (this.board[col][row] === true && col === this.a && row === this.b)
      return COLORS.BOX;
    else if (this.board[col][row] === true) {
      return COLORS.BODY;
    }
    if (this.board[col][row] === true && col == this.a && row == this.b) {
      return COLORS.BOX;
    }
    return COLORS.BOARD;
  }
  moveLeft() {
    this.board[this.x][this.y] = false;
    this.x = this.x - 1;
    this.board[this.x][this.y] = true;
    this.setColors(this.y, this.x);
  }
  moveRight() {
    this.board[this.x][this.y] = false;
    this.x = this.x + 1;
    this.board[this.x][this.y] = true;
    this.setColors(this.y, this.x);
  }
  moveUp() {
    this.board[this.x][this.y] = false;
    this.y = this.y - 1;
    this.board[this.x][this.y] = true;
    this.setColors(this.y, this.x);
  }
  moveDown() {
    this.board[this.x][this.y] = false;
    this.y = this.y + 1;
    this.board[this.x][this.y] = true;
    this.setColors(this.y, this.x);
  }
}
