import { Input, Component, OnInit } from '@angular/core';
import { DistributionPair } from '../config.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
	@Input() value: number = 0;
	@Input() pair: DistributionPair = new DistributionPair(0, 0);
	@Input() height: number = 3;
	@Input() maxHeight: number = 5;

  constructor() { }

  ngOnInit() {
	  console.log(this.value, this.pair, this.height, this.maxHeight);
  }
}
