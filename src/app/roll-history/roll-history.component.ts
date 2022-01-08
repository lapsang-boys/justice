import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.css']
})
export class RollHistoryComponent implements OnInit {
	history: number[] = [];
	historySize: number = 5;

	constructor(
		private configService: ConfigService,
	) { }

	ngOnInit(): void {
		this.configService.historySubject.subscribe((subHistory: number[]) => {
			this.history = subHistory;
		})
	}
}
