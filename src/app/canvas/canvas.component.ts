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
  public a = 3;
  public b = 3;

  public boxesPosition: {};
  public targetsPosition: {};
  public manPosition: number[];

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService
  ) { }

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

    for(var i=0; i<this.targetsPosition.length; i++){
      if (this.targetsPosition[i][0] == row && this.targetsPosition[i][1] == col) {
        returnUrl =  "url(" + IMAGES.CROSS + ")";
      }
    }
    
    for (var i=0;i<this.boxesPosition.length; i++) {
      
      if (this.boxesPosition[i][0] == row && this.boxesPosition[i][1] == col) {

        for(var j=0; j<this.targetsPosition.length; j++){
          if (this.boxesPosition[i][0] == this.targetsPosition[j][0] && this.boxesPosition[i][1] == this.targetsPosition[j][0]) {
            returnUrl = "url(" + IMAGES.BOX_RIGHT + ")";
          }
          else{
            returnUrl = "url(" + IMAGES.BOX_WRONG + ")";
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
    this.setImage(this.x, this.y);
  }
  moveRight() {
    this.board[this.x][this.y] = false;
    this.x = this.x + 1;
    if (this.x == BOARD_SIZE) {
      this.x = this.x - 1;
    }
    this.board[this.x][this.y] = true;
    this.setImage(this.x, this.y);
  }
  moveUp() {
    if(this.checkBox(this.x,this.y-1,this.a,this.b)==true)
    {
      this.board[this.x][this.y] = false;
      this.y = this.y - 1;
      this.b=this.b-1;
      this.board[this.x][this.y] = true;
      this.board[this.a][this.b]=true;
      this.setImage(this.x, this.y);
      
    }
    else{
    this.board[this.x][this.y] = false;
    this.y = this.y - 1;
    if (this.y == -1) {
      this.y = this.y + 1;
    }
    this.board[this.x][this.y] = true;
    this.setImage(this.x, this.y);
  }
  };
  moveDown() {
    this.board[this.x][this.y] = false;
    this.y = this.y + 1;
    if (this.y == BOARD_SIZE) {
      this.y = this.y - 1;
    }
    this.board[this.x][this.y] = true;
    this.setImage(this.x, this.y);
  }
  checkBox(i:number,j:number,q:number,w:number) {
  if(i==q || j==w)
  {
    return true;
  }
  return false;
};
}
