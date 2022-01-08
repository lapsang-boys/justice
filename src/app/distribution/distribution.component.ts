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
	lastSampledNumber: number|undefined;

	constructor(
		private configService: ConfigService,
	) { }

	sample(): void {
		this.lastSampledNumber = this.dist.sample()
		this.pairMap = this.dist.pairMap();
	}

	ngOnInit(): void {
		this.configService.distSubject.subscribe((subDist: DistributionState) => {
			this.dist = subDist;
			this.pairMap = this.dist.pairMap();
		})
		// Beautiful <3
		setTimeout(() => this.configService.distribution(), 200);
	}

	maxElement(): number {
		return Math.max.apply(null, Array.from(this.pairMap.values()).map(p => p.original))
	}
}
