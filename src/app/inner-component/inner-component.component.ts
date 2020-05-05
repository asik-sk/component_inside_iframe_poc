import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inner-component',
  templateUrl: './inner-component.component.html',
  styleUrls: ['./inner-component.component.css']
})
export class InnerComponentComponent implements OnInit {

  @Input() firstInput;

  @Output() emitOutput: EventEmitter<any> = new EventEmitter();;

  constructor() { }

  ngOnInit() {
  }

  click(){
    this.emitOutput.emit({inputData: this.firstInput});
  }

}
