import { Injectable } from '@angular/core';
import { Die } from './die';
import { BehaviorSubject } from 'rxjs';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	public dies: Die[] = [];
	private numBatches: number = 1;
	dist: DistributionState = this.asdf();
	distSubject = new BehaviorSubject<DistributionState>(this.dist);

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

	asdf() {
		let vals = []

		for (let d of this.dies) {
			let tup = []
			for (let i = d.low; i <= d.top; i++) {
				tup.push(i)
			}
			vals.push(tup)
		}

		const duplicateArr = (arr: any[], times: number) => {
			return Array(times)
				.fill([...arr])
				.reduce((a, b) => a.concat(b));
			}

		if (vals.length === 0) {
			return new DistributionState([]);
		}

		const cartesian = (...a: any[]) => a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
		const cart = cartesian(...vals);
		const rawRolls = cart.map((l: number[]) => l.reduce((partial_sum: number, a: any) => partial_sum + a), 0);

		const dupRolls = duplicateArr(rawRolls, this.numBatches);

		const d: Distribution = dupRolls;
		const ds = new DistributionState(d)
		return ds
	}

	distribution() {
		this.distSubject.next(this.asdf());
	}

	setNumBatches(numBatches: number) {
		this.setBatches(numBatches);
		this.distribution();
	}
}

export type Distribution = number[];

export class DistributionState {
	original: Distribution;
	current: Distribution;

	constructor(d: Distribution) {
		const shuf = function shuffleArray(array: number[]): number[] {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array
		}

		const dShuf = shuf(d);
		this.original = [...dShuf];
		this.current = [...dShuf];
	}

	sample(): number|undefined {
		return this.current.pop();
	}

	toString(): string {
		return this.current.toString();
	}
}
