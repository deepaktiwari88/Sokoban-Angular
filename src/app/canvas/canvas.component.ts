import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { COLORS, BOARD_SIZE, IMAGES } from "./constants";
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
      boxes: {};
      target: {};
    };
    grid: number[][];
  }[];

  currentLevel: {
    level: number;
    "target-moves": number;
    positions: {
      man: number[];
      boxes: {};
      target: {};
    };
    grid: number[][];
  };

  id: number;
  public rows: number;
  public columns: number;
  public board = [];
  private sub: any;

  public x = 0;
  public y = 0;
  public a = 2;
  public b = 1;

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.allLevels = this.levelService.getAllLevels();
      this.currentLevel = this.allLevels.filter((x) => x.level == this.id)[0];
      this.rows = this.currentLevel.grid.length;
      this.columns = this.currentLevel.grid[0].length;
      this.setBoard();
    });
  }

  setBoard(): void {
    this.board = [];

    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
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

  setImage(row: number, col: number): string {
    if (this.currentLevel.grid[row][col] == 0)
      return "url(" + IMAGES.FREE + ")";

    if (
      this.currentLevel.grid[row][col] == 1 ||
      this.currentLevel.grid[row][col] == 2
    )
      return "url(" + IMAGES.BRICK + ")";

    return "url(" + IMAGES.AVATAR + ")";
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
