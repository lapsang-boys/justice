export class Die {
	readonly low: number;
	readonly top: number;

	constructor(low: number, top: number) {
		if (low >= top) {
			throw new Error(`Invalid die setup, low (${low}) is larger than (or equal) top (${top}).`);
		}
		this.low = low;
		this.top = top;
	}
}
