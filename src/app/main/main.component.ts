import { Component, OnInit } from '@angular/core';
import { LogotypeService } from '../logotype.service';
import { Router } from '@angular/router';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  logos: any;

  constructor(private logoService: LogotypeService, private router: Router) { }

  ngOnInit() {
    const logotypes = this.logoService.getLogos();
    const fonts = logotypes.map(el => {
      return el.font;
    });
    WebFont.load({
      google: {
        families: fonts
      },
      active: () => {
        this.logos = logotypes;
      }
    });
  }

  onClick(id) {
    this.router.navigate([`logo/${id}`]);
  }


}
