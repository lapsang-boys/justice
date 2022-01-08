import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.css']
})
export class RollHistoryComponent implements OnInit {
	@Input() history: number[] = [];
	historySize: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
