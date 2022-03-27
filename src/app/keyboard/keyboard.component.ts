import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Letter } from '../letter-model';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit,OnChanges {

  @Input() green: string [];
  @Input() yellow: string [];
  @Input() gray: string [];
  @Input() resetKeyboard: boolean;
  @Output() emitter = new EventEmitter<string>();

  row1: Letter[] = [];
  row2: Letter[] = [];
  row3: Letter[] = [];
  
  keyColor: string = '#581845';
  greenColor: string = '#2FAC03';
  yellowColor: string = '#FFC300';
  grayColor: string = '#999999';


  alphabets = ['Q','W','E','R','T','Y','U','I','O','P',
              'A','S','D','F','G','H','J','K','L',
              'Z','X','C','V','B','N','M'];

  
  alphabetMap = {'Q': 0, 'W': 1, 'E': 2, 'R': 3, 'T': 4, 'Y': 5, 'U': 6, 'I': 7, 'O': 8, 'P': 9,
  'A': 10, 'S': 11, 'D': 12, 'F': 13, 'G': 14, 'H': 15, 'J': 16, 'K': 17, 'L': 18,
  'Z': 19, 'X': 20, 'C': 21, 'V': 22, 'B': 23, 'N': 24, 'M': 25
  }

  constructor() { }

  ngOnInit() {
    this.initKeyboard();
  }

  onClick(alphabet: string) {
    this.emitter.emit(alphabet);
  }

  isFilled(letter: Letter) {
    if(letter.fill) return letter.color;
    return;
  }

  applyKeyColors(letter: Letter) {
    if(letter.fill) return { 'background-color': letter.color, 'border': '2px solid #222' }
    else return { 'border-color': letter.color, 'border': '2px solid' }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.resetKeyboard) {
      this.initKeyboard();
      return;
    }
    this.green.forEach(green => {
      let index = this.alphabetMap[green];
      if(index < 10) {
        this.row1[index].fill = true;
        this.row1[index].color = this.greenColor;
      } else if(index<19) {
        this.row2[index-10].fill = true;
        this.row2[index-10].color = this.greenColor;
      } else {
        this.row3[index-19].fill = true;
        this.row3[index-19].color = this.greenColor;
      }
    });

    this.yellow.forEach(yellow => {
      let index = this.alphabetMap[yellow];
      if(index < 10) {
        this.row1[index].fill = true;
        this.row1[index].color = this.yellowColor;
      } else if(index<19) {
        this.row2[index-10].fill = true;
        this.row2[index-10].color = this.yellowColor;
      } else {
        this.row3[index-19].fill = true;
        this.row3[index-19].color = this.yellowColor;
      }
    });

    this.gray.forEach(gray => {
      let index = this.alphabetMap[gray];
      if(index < 10) {
        this.row1[index].fill = true;
        this.row1[index].color = this.grayColor;
      } else if(index<19) {
        this.row2[index-10].fill = true;
        this.row2[index-10].color = this.grayColor;
      } else {
        this.row3[index-19].fill = true;
        this.row3[index-19].color = this.grayColor;
      }
    })
  }

  initKeyboard() {
    this.row1 = [];
    this.row2 = [];
    this.row3 = [];

    for(let i=0; i<this.alphabets.length; i++) {
      if(i<10) {
        this.row1.push(new Letter(this.alphabets[i],false,this.keyColor));
      } else if(i<19) {
        this.row2.push(new Letter(this.alphabets[i],false,this.keyColor));
      } else {
        this.row3.push(new Letter(this.alphabets[i],false,this.keyColor));
      }
    }
    this.row3.push(new Letter('delete',false,this.keyColor,'backspace'));
  }

}
