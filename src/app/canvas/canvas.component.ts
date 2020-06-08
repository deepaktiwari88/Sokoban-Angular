import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { COLORS, BOARD_SIZE, IMAGES } from "./constants";
import { BROWSER_ANIMATIONS_PROVIDERS } from "@angular/platform-browser/animations/src/providers";
import { LevelService } from "../services/levels.service";
import { stringify } from "querystring";

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
      boxes: number[][];
      target: number[][];
    };
    grid: number[][];
  }[];

  currentLevel: {
    level: number;
    "target-moves": number;
    positions: {
      man: number[];
      boxes: number[][];
      target: number[][];
    };
    grid: number[][];
  };

  id: number;
  public rows: number;
  public columns: number;
  public board = [];
  private sub: any;
  public targetMoves: number;

  public x = 0;
  public y = 0;
  public a = 2;
  public b = 1;

  public boxesPosition: number[][];
  public targetsPosition: number[][];
  public manPosition: number[];

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
      this.manPosition = this.currentLevel.positions.man;
      this.boxesPosition = this.currentLevel.positions.boxes;
      this.targetsPosition = this.currentLevel.positions.target;
      this.targetMoves = this.currentLevel["target-moves"];
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
    var returnUrl;

    if (this.currentLevel.grid[row][col] == 0)
      returnUrl = "url(" + IMAGES.FREE + ")";

    if (
      this.currentLevel.grid[row][col] == 1 ||
      this.currentLevel.grid[row][col] == 2
    )
      returnUrl = "url(" + IMAGES.BRICK + ")";

    if (this.manPosition[0] == row && this.manPosition[1] == col)
      returnUrl = "url(" + IMAGES.AVATAR + ")";

    for (var i = 0; i < this.targetsPosition.length; i++) {
      if (
        this.targetsPosition[i][0] == row &&
        this.targetsPosition[i][1] == col
      ) {
        returnUrl = "url(" + IMAGES.CROSS + ")";
      }
    }

    for (var i = 0; i < this.boxesPosition.length; i++) {
      if (this.boxesPosition[i][0] == row && this.boxesPosition[i][1] == col) {
        returnUrl = "url(" + IMAGES.BOX_WRONG + ")";

        for (var j = 0; j < this.targetsPosition.length; j++) {
          if (
            this.boxesPosition[i][0] == this.targetsPosition[j][0] &&
            this.boxesPosition[i][1] == this.targetsPosition[j][0]
          ) {
            returnUrl = "url(" + IMAGES.BOX_RIGHT + ")";
            break;
          }
        }
      }
    }

    return returnUrl;
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
