import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { COLORS, BOARD_SIZE, IMAGES } from "./constants";
import { BROWSER_ANIMATIONS_PROVIDERS } from "@angular/platform-browser/animations/src/providers";
import { LevelService } from "../services/levels.service";
import { stringify } from "querystring";
import { NgxSpinnerService } from "ngx-spinner";
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

  public boxesPosition: number[][];
  public targetsPosition: number[][];
  public manPosition: number[];
  public currentMoves: number = 0;
  public hasWon: boolean = false;
  public hasLost: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private levelService: LevelService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.SpinnerService.show();

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 2000);
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

  Navigate(): void {
    if (this.id != this.allLevels.length) {
      var newID: number = this.id + 1;
      window.location.replace("http://localhost:4200/levels/" + newID);
    }
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

    for (var i = 0; i < this.targetsPosition.length; i++) {
      if (
        this.targetsPosition[i][0] == row &&
        this.targetsPosition[i][1] == col
      ) {
        returnUrl = "url(" + IMAGES.CROSS + ")";
      }
    }

    if (this.manPosition[0] == row && this.manPosition[1] == col)
      returnUrl = "url(" + IMAGES.AVATAR_RIGHT + ")";

    for (var i = 0; i < this.boxesPosition.length; i++) {
      if (this.boxesPosition[i][0] == row && this.boxesPosition[i][1] == col) {
        returnUrl = "url(" + IMAGES.BOX_WRONG + ")";

        for (var j = 0; j < this.targetsPosition.length; j++) {
          if (
            this.boxesPosition[i][0] == this.targetsPosition[j][0] &&
            this.boxesPosition[i][1] == this.targetsPosition[j][1]
          ) {
            returnUrl = "url(" + IMAGES.BOX_RIGHT + ")";
            this.checkWinningState();
            break;
          }
        }
      }
    }

    return returnUrl;
  }

  checkWinningState(): void {

    var boxesPosition: number[][] = this.boxesPosition;
    var targetsPosition: number[][] = this.targetsPosition;

    boxesPosition.sort();
    targetsPosition.sort();

    console.log("BOX" + boxesPosition);
    console.log("TARGET" + targetsPosition);

    this.hasWon = JSON.stringify(boxesPosition) == JSON.stringify(targetsPosition);

  }

  moveLeft() {
    var nextRow = this.manPosition[0];
    var nextCol = this.manPosition[1] - 1;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (
          this.checkBox(nextRow, nextCol - 1) == true &&
          !this.isBoxPresent(nextRow, nextCol - 1)[0]
        ) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition[1] = this.manPosition[1] - 1;
          this.boxesPosition[index_box][1] =
            this.boxesPosition[index_box][1] - 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition[1] = this.manPosition[1] - 1;
        this.increaseMoves();
      }
    }
  }

  moveRight() {
    var nextRow = this.manPosition[0];
    var nextCol = this.manPosition[1] + 1;

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (
          this.checkBox(nextRow, nextCol + 1) == true &&
          !this.isBoxPresent(nextRow, nextCol + 1)[0]
        ) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition[1] = this.manPosition[1] + 1;
          this.boxesPosition[index_box][1] =
            this.boxesPosition[index_box][1] + 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition[1] = this.manPosition[1] + 1;
        this.increaseMoves();
      }
    }
  }

  moveUp() {
    var nextRow = this.manPosition[0] - 1;
    var nextCol = this.manPosition[1];

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (
          this.checkBox(nextRow - 1, nextCol) == true &&
          !this.isBoxPresent(nextRow - 1, nextCol)[0]
        ) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];
          this.manPosition[0] = this.manPosition[0] - 1;
          this.boxesPosition[index_box][0] =
            this.boxesPosition[index_box][0] - 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition[0] = this.manPosition[0] - 1;
        this.increaseMoves();
      }
    }
  }

  moveDown() {
    var nextRow = this.manPosition[0] + 1;
    var nextCol = this.manPosition[1];

    if (this.checkBox(nextRow, nextCol) == true) {
      if (this.isBoxPresent(nextRow, nextCol)[0]) {
        if (
          this.checkBox(nextRow + 1, nextCol) == true &&
          !this.isBoxPresent(nextRow + 1, nextCol)[0]
        ) {
          var index_box = this.isBoxPresent(nextRow, nextCol)[1];

          this.manPosition[0] = this.manPosition[0] + 1;
          this.boxesPosition[index_box][0] =
            this.boxesPosition[index_box][0] + 1;
          this.increaseMoves();
        }
      } else {
        this.manPosition[0] = this.manPosition[0] + 1;
        this.increaseMoves();
      }
    }
  }

  increaseMoves(): void {
    this.currentMoves++;
    if (this.currentMoves > this.targetMoves) {
      this.hasLost = true;
    }
  }

  checkBox(i: number, j: number) {
    if (i < 0 || j < 0 || i >= this.rows || j >= this.columns) return false;

    if (
      this.currentLevel.grid[i][j] == 1 ||
      this.currentLevel.grid[i][j] == 2
    ) {
      return false;
    }
    return true;
  }

  isBoxPresent(row: number, col: number): [boolean, number] {
    for (let i: number = 0; i < this.boxesPosition.length; i++) {
      if (this.boxesPosition[i][0] == row && this.boxesPosition[i][1] == col) {
        return [true, i];
      }
    }

    return [false, -1];
  }
  refresh(): void {
    window.location.reload();
  }
}
