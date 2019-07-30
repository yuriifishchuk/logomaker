import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogotypeService {

  logos: Logotype[] = [
    { id: '1', text: 'instagram', shape: 'circle', font: 'Roboto' },
    { id: '2', text: 'google', shape: 'triangle', font: 'Open Sans' },
    { id: '3', text: 'facebook', shape: 'square', font: 'Lacquer' },
    { id: '4', text: 'reebok', shape: 'square', font: 'Atomic Age' },
    { id: '5', text: 'adidas', shape: 'circle', font: 'Courgette' },
    { id: '6', text: 'nike', shape: 'triangle', font: 'Ubuntu' }
  ];
  constructor() { }

  getLogo(id: string) {
    return this.logos.find(logo => {
      return logo.id === id;
    });
  }

  changeProperty(id, property, value) {
    const logo = this.getLogo(id);
    logo[property] = value;
  }

  getLogos(): Logotype[] {
    return this.logos;
  }

}
