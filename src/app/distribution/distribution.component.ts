import { Component, OnInit } from '@angular/core';
import { ConfigService, DistributionState } from '../config.service';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.css']
})
export class DistributionComponent implements OnInit {
	dist: DistributionState = new DistributionState([]);
	lastSampledNumber: number|undefined;

	constructor(
		private configService: ConfigService,
	) { }

	sample(): void {
		this.lastSampledNumber = this.dist.sample()
	}

	ngOnInit(): void {
		this.configService.distSubject.subscribe((subDist: DistributionState) => {
			this.dist = subDist;
		})
		// Beautiful <3
		setTimeout(() => this.configService.distribution(), 200);
	}
}
