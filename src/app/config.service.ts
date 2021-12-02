import { Injectable } from '@angular/core';
import { Die } from './die';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	public dies: Die[] = [];
	private numBatches: number = 2;

	constructor() {
		console.log(new Die(1, 6));
	}

	addDie(d: Die) {
		this.dies.push(d);
	}

	removeDie(d: Die) {
		this.dies = this.dies.filter(dprim => dprim !== d);
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
