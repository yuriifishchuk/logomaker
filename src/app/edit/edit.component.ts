import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogotypeService } from '../logotype.service';
import { HttpClient } from '@angular/common/http';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  logoText: any;
  fontList;
  oldText: string;
  changedProperties = {
    shape: null,
    text: null,
    font: null
  };

  constructor(private activateRoute: ActivatedRoute,
              private router: Router, private logotypeService: LogotypeService,
              private http: HttpClient) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params.id;
    const logotype = this.logotypeService.getLogo(this.id.toString());
    this.oldText = logotype.text;
    this.http.get('https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyCe5UY0-qOCb0t6uqGIX4EElna8XD7-p-0')
      .subscribe((data: any) => {
        this.fontList = data.items.slice(0, 100);
      });
  }

  onSave() {
    this.changedProperties.text ? this.logotypeService.changeProperty(this.id, 'text', this.changedProperties.text) : null;
    this.changedProperties.font ? this.logotypeService.changeProperty(this.id, 'font', this.changedProperties.font) : null;
    this.changedProperties.shape ? this.logotypeService.changeProperty(this.id, 'shape', this.changedProperties.shape) : null;
    this.router.navigate(['/']);
  }

  onClick() {
    this.router.navigate(['/']);
  }

  clearLogo(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, 120);
  }

  changeLogo(canvas, selectedLogo) {
    this.changedProperties.shape = selectedLogo;
    canvas = canvas.canvas.nativeElement;
    this.clearLogo(canvas);
    switch (selectedLogo) {
      case 'circle':
        this.drawCircle(canvas);
        break;
      case 'square':
        this.drawSquare(canvas);
        break;
      case 'triangle':
        this.drawTriangle(canvas);
        break;
      default:
        break;
    }
  }

  changeFont(canvas, selectedFont) {
    this.changedProperties.font = selectedFont;
    WebFont.load({
      google: {
        families: [selectedFont]
      },
      active: () => {
        const fontFamily = selectedFont;
        canvas = canvas.canvas.nativeElement;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 120, canvas.width, canvas.height);
        ctx.fillStyle = '#D74022';
        ctx.font = `40px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.fillText(this.oldText, canvas.width / 2, 170);
      }
    });
  }

  drawCircle(canvas): void {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 30, 50, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  drawSquare(canvas): void {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.fillRect(canvas.width - canvas.width / 2 - 50, canvas.height - canvas.height / 2 - 80, 100, 100);
  }

  drawTriangle(canvas): void {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - canvas.height / 2 - 80);
    ctx.lineTo(canvas.width / 2 + 50, canvas.height - canvas.height / 2 - 80 + 100);
    ctx.lineTo(canvas.width / 2 - 50, canvas.height - canvas.height / 2 - 80 + 100);
    ctx.fill();
  }

  drawText(canvas, text) {
    this.changedProperties.text = text;
    this.oldText = text;
    canvas = canvas.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 120, canvas.width, canvas.height);
    ctx.fillStyle = '#D74022';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, 170);
  }

}
