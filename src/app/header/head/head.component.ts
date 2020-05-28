import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html'
})
export class HeadComponent implements OnInit {

  titulo: string = "Curve";
  

  constructor() { }

  ngOnInit(): void {
  }

}
