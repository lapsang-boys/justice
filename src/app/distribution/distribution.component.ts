import { Component, OnInit } from '@angular/core';
import { ConfigService, DistributionState, DistributionPair } from '../config.service';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {
	dist: DistributionState = new DistributionState([]);
	pairMap: Map<number, DistributionPair> = new Map();
	history: number[] = [];

	constructor(
		private configService: ConfigService,
	) { }

	sample(): void {
		this.configService.sample();
	}

	ngOnInit(): void {
		this.configService.distSubject.subscribe((subDist: DistributionState) => {
			this.dist = subDist;
			this.pairMap = this.dist.pairMap();
		})
		this.configService.historySubject.subscribe((subHistory: number[]) => {
			this.history = subHistory;
		})
		// Beautiful <3
		setTimeout(() => this.configService.distribution(), 200);
	}

	maxElement(): number {
		return Math.max.apply(null, Array.from(this.pairMap.values()).map(p => p.original))
	}
}
