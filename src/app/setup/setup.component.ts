import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

 import {MatSliderChange} from '@angular/material/slider';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {
	min_die_bound: number = 1;
	max_die_bound: number = 3;
	cur_num_die: number = this.min_die_bound+1;

	min_batches_bound: number = 1;
	max_batches_bound: number = 5;
	cur_num_batches: number = this.min_batches_bound+1;

	constructor(
	  private configService: ConfigService,
	) { }

	updateDie(e: MatSliderChange) {
		this.cur_num_die = Number(e.value);
	}

	updateBatches(e: MatSliderChange) {
		this.cur_num_batches = Number(e.value);
		this.configService.setNumBatches(this.cur_num_batches);
	}
}
