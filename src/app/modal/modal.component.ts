import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() showModal: boolean = false;
  @Input() modalData: any = {};

  @Output() emitter: EventEmitter<string> =  new EventEmitter<string>();
  @Output() closeRules: EventEmitter<string> =  new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.showModal) document.getElementById('toggler').click();
  }

  reloadChallenge() {
    this.emitter.emit('reload');
  }

  closeModal() {
    this.closeRules.emit('close');
  }

  

}
