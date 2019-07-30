import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LogotypeService } from '../logotype.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  @Input() logo: any;
  @ViewChild('myCanvas') canvas: ElementRef;

  constructor(private logotypeService: LogotypeService) { }

  ngOnInit() {
    let logotype = this.logotypeService.getLogo(this.logo);
    if (this.canvas.nativeElement.getContext) {
      this.changeLogo(logotype.shape);
      this.drawText(this.canvas.nativeElement, logotype.text, logotype.font);
    }
  }
  changeLogo(selectedLogo) {
    switch (selectedLogo) {
      case 'circle':
        this.drawCircle(this.canvas.nativeElement);
        break;
      case 'square':
        this.drawSquare(this.canvas.nativeElement);
        break;
      case 'triangle':
        this.drawTriangle(this.canvas.nativeElement);
        break;
      default:
        break;
    }
  }

  drawCircle(canvas): void {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 30, 50, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  drawSquare(canvas): void {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.fillRect(canvas.width - canvas.width / 2 - 50, canvas.height - canvas.height / 2 - 80, 100, 100);
  }

  drawTriangle(canvas): void {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height - canvas.height / 2 - 80);
    ctx.lineTo(canvas.width / 2 + 50, canvas.height - canvas.height / 2 - 80 + 100);
    ctx.lineTo(canvas.width / 2 - 50, canvas.height - canvas.height / 2 - 80 + 100);
    ctx.fill();
  }

  drawText(canvas, text, font) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D74022';
    ctx.font = `40px ${font}`;
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, 170);
  }

}
