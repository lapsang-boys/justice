import { Injectable } from '@angular/core';
import { Die } from './die';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	public dies: Die[] = [];
	private numBatches: number = 2;
	public dist: number[][] = [];

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

	distribution() {
		let vals = []
		for (let d of this.dies) {
			let tup = []
			for (let i = d.low; i <= d.top; i++) {
				tup.push(i)
			}
			vals.push(tup)
		}

		const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
		this.dist = cartesian(...vals);
		console.log(this.dist.map(l => l.reduce((partial_sum, a) => partial_sum + a), 0));
	}
}
