import { Injectable } from '@angular/core';
declare var require:any;
var wordList = require('word-list-json');

@Injectable({
  providedIn: 'root'
})
export class WordService {

  four_letter_words: string[] = [];
  five_letter_words: string[] = [];
  six_letter_words: string[] = [];

  constructor() { 
    this.four_letter_words = wordList.filter(word => word.length == 4);
    this.five_letter_words = wordList.filter(word => word.length == 5);
    this.six_letter_words = wordList.filter(word => word.length == 6);
  }

  isValidWord(word: string, length: number): boolean {
    if(length == 4) return this.four_letter_words.indexOf(word) != -1;
    if(length == 5) return this.five_letter_words.indexOf(word) != -1;
    if(length == 6) return this.six_letter_words.indexOf(word) != -1; 
    return;
  }

  getRandomWord(length: number): string {
    let wordArr = [];
    if(length == 4) wordArr = this.four_letter_words;
    else if(length == 5) wordArr = this.five_letter_words;
    else if(length == 6) wordArr = this.six_letter_words;
    else wordArr = wordList;
    let index = Math.floor(Math.random() * wordArr.length);
    return wordArr[index];
  }
}
