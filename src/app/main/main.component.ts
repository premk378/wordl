import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Letter } from '../letter-model';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  word1: Letter[] = [];
  word2: Letter[] = [];
  word3: Letter[] = [];
  word4: Letter[] = [];
  word5: Letter[] = [];
  word6: Letter[] = [];

  wordLength = 5;
  maxAttempts = 6;
  activeWordIndex: number
  activeLetterIndex: number;
  currentWord: string = '';
  answerWord: string = '';
  attempts: number = 0;
  defaultColor: string = '#183153';
  highlightColor: string = '#80D5FA';
  greenColor: string = '#2FAC03';
  yellowColor: string = '#FFC300';
  grayColor: string = '#999999';
  green: string[] = [];
  yellow: string[] = [];
  gray: string[] = [];
  showModal: boolean = false;
  modalData: any = {};
  resetKeyboard: boolean;

  alphabets = ['Q','W','E','R','T','Y','U','I','O','P',
              'A','S','D','F','G','H','J','K','L',
              'Z','X','C','V','B','N','M'];
  
  constructor(private wordService: WordService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.wordLength = params['length'];
      if(this.wordLength) this.initChallenge();
    });
  }

  handleKeyboardAction(letter) {
    let selected = this[`word${this.activeWordIndex+1}`];
    if(letter=='delete'){
      if(this.activeLetterIndex<1) return;
      this.activeLetterIndex--;
      selected[this.activeLetterIndex].text = '';
      this.currentWord = this.currentWord.slice(0,-1);
      return;
    }

    if(this.activeLetterIndex >= this.wordLength) return;

    selected[this.activeLetterIndex].text = letter;
    this.activeLetterIndex++;
    this.currentWord += letter;
    if(this.activeLetterIndex == this.wordLength) {
      let valid = this.wordService.isValidWord(this.currentWord.toLowerCase(), this.currentWord.length);
      if(!valid) {
        this.toastr.error('Invalid Word');
        this[`word${this.activeWordIndex+1}`].forEach(letter => {
          letter.active = false;
        });
        this.shakeInvalidWord(this.activeWordIndex);
      }
      else {
        this.attempts++;
        let greens = [];
        let yellows = [];
        let grays = [];
        let arr = [...this.answerWord.toLowerCase()];
        for(let i=0; i<selected.length; i++) {
          if(arr[i] == selected[i].text.toLowerCase()) {
            selected[i].color = this.greenColor;
            greens.push(selected[i].text);
          }
          else if(arr.indexOf(selected[i].text.toLowerCase()) != -1){
            selected[i].color = this.yellowColor;
            yellows.push(selected[i].text);
          } else {
            selected[i].color = this.grayColor;
            grays.push(selected[i].text);
          }
        }
        this.resetKeyboard = false;
        this.green = greens;
        this.yellow = yellows;
        this.gray = grays;
        this.activeLetterIndex = 0;
        this.activeWordIndex++;
        this.highlightActiveRow(this.activeWordIndex+1);
        this.currentWord = '';
        if(this.green.length == this.wordLength) {
          this.showModal = true;
          this.modalData = {type: "success", title: "Solved!!", text: `Solved in ${this.attempts} attempts`};
        }
        else if(this.maxAttempts == this.attempts) {
          this.showModal = true;
          this.modalData = {type: "failed", title: "Try Again", text: `The word was "${this.answerWord.toUpperCase()}"`};
        }
      }
    }
  }

  shakeInvalidWord(index: number) {
    if(this.attempts <= this.maxAttempts)
      this[`word${index+1}`].forEach(letter => {
        letter.active = true;
      });
  }

  initChallenge() {
    this.showModal = false;
    this.resetKeyboard = true;
    this.attempts = 0;
    this.word1 = [];
    this.word2 = [];
    this.word3 = [];
    this.word4 = [];
    this.word5 = [];
    this.word6 = [];

    for(let i=1; i<=this.maxAttempts; i++) {
      for(let j=1; j<=this.wordLength; j++) {
        this[`word${i}`].push(new Letter('',false,this.defaultColor));
      }
    }
    this.highlightActiveRow(1);
    this.activeWordIndex = 0;
    this.activeLetterIndex = 0;
    this.answerWord = this.wordService.getRandomWord(this.wordLength);
    //console.log(this.answerWord);
  }

  highlightActiveRow(row: number) {
    if(row <= this.maxAttempts)
      this[`word${row}`].forEach(letter => letter.color = this.highlightColor);
  }
}
