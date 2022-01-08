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
	private numBatches: number = 2;
	dist: DistributionState = this.asdf();
	distSubject = new BehaviorSubject<DistributionState>(this.dist);

	constructor() {
		console.log(new Die(1, 6));
	}

	addDie(d: Die) {
		this.dies.push(d);
		this.distribution();
	}

	removeDie(d: Die) {
		this.dies = this.dies.filter(dprim => dprim !== d);
		this.distribution();
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
		if (vals.length === 1) {
			return new DistributionState(duplicateArr(vals[0], this.numBatches));
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

	leftOf(arr: number[], n: number): number {
		return arr.filter(d => d === n).length;
	}

	uniqueRemaining(): number[] {
		return [...new Set(this.current)];
	}

	currentToMap(): Map<number, number> {
		const m = new Map<number, number>();
		this.uniqueRemaining().forEach(d => m.set(d, this.leftOf(this.current, d)));
		return m;
	}

	originalToMap(): Map<number, number> {
		const m = new Map<number, number>();
		this.original.forEach(d => m.set(d, this.leftOf(this.original, d)));
		return m;
	}

	pairMap() {
		const cm = this.currentToMap();
		const om = this.originalToMap();
		const pairs = new Map<number, DistributionPair>();
		om.forEach((v, k) => {
			if (cm.has(k)) {
				const p = new DistributionPair(v, cm.get(k) as number);
				pairs.set(k, p);
			} else {
				pairs.set(k, new DistributionPair(v, 0));
			}
		});
		return pairs;
	}

	sortedRemaining(): number[] {
		return this.current.sort((a, b) => a - b);
	}

	toString(): string {
		return this.current.toString();
	}
}


export class DistributionPair {
	original: number;
	current: number;
	constructor(o: number, c: number) {
		this.original = o;
		this.current = c;
	}
}
