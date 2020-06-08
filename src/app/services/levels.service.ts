import { Injectable } from "@angular/core";
import { allLevels } from "src/AllLevels";

@Injectable({
  providedIn: "root",
})
export class LevelService {
  constructor() {}

  getAllLevels() {
    return allLevels;
  }
}
