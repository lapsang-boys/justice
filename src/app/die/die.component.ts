import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../config.service';
import { Die } from '../die';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.css']
})
export class DieComponent implements OnInit {
	d: Die = new Die(1, 6);

	constructor(
	  private configService: ConfigService,
	) { }

  ngOnInit(): void {
	  this.configService.addDie(this.d);
  }

  ngOnDestroy(): void {
	this.configService.removeDie(this.d);
  }

  changeLow(e: any) {
	  let tmp = Number(e.target.value);
	  if (tmp >= this.d.top) {
		  e.target.value = this.d.low;
		  return;
	  }
	  this.d.low = tmp;
  }
  changeTop(e: any) {
	  let tmp = Number(e.target.value);
	  if (tmp <= this.d.low) {
		  e.target.value = this.d.top;
		  return;
	  }
	  this.d.top = Number(e.target.value);
  }
}
