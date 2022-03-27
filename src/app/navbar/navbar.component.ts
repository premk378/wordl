import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showModal: boolean;
  modalData: any = {};
  constructor() { }

  ngOnInit() {
  }

  showInfo(){
    this.showModal = true;
    this.modalData = {type: 'info', title: 'Rules', text: 'Rules'};
  }
}
