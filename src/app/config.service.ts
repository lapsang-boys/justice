import { Injectable } from '@angular/core';
import { Die } from './die';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	private dies: Die[] = [];
	private numBatches: number = 1;

	constructor() {
		console.log(new Die(1, 6));
		// console.log(new Die(8, 6));
	}

	addDie(d: Die) {
		this.dies.push(d);
	}

	reset() {
		this.dies = [];
	}

	setBatches(numBatches: number) {
		if (numBatches <= 0) {
			throw new Error(`Invalid number of batches, can't be less than or equal to zero!`);
		}
		this.numBatches = numBatches;
	}
}
