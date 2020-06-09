import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private SpinnerService: NgxSpinnerService) {}

  ngOnInit() {
    this.SpinnerService.show();

    setTimeout(() => {
      this.SpinnerService.hide();
    }, 2000);
  }
}
