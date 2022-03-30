import { Injectable } from '@angular/core';
declare var require:any;
var fullList = require('word-list-json');
var wordList = require('../words/words.json');

@Injectable({
  providedIn: 'root'
})
export class WordService {

  four_letter_words: string[] = [];
  five_letter_words: string[] = [];
  six_letter_words: string[] = [];
  isogram_four_letter_words: string[] = [];
  isogram_five_letter_words: string[] = [];
  isogram_six_letter_words: string[] = [];

  constructor() { 
    let isogramList = wordList.filter(word => this.isIsogram(word));
    this.isogram_four_letter_words = isogramList.filter(word => word.length == 4);
    this.isogram_five_letter_words = isogramList.filter(word => word.length == 5);
    this.isogram_six_letter_words = isogramList.filter(word => word.length == 6);
    this.four_letter_words = fullList.filter(word => word.length == 4);
    this.five_letter_words = fullList.filter(word => word.length == 5);
    this.six_letter_words = fullList.filter(word => word.length == 6);
  }

  isValidWord(word: string, length: number): boolean {
    if(length == 4) return this.four_letter_words.indexOf(word) != -1;
    if(length == 5) return this.five_letter_words.indexOf(word) != -1;
    if(length == 6) return this.six_letter_words.indexOf(word) != -1; 
    return;
  }

  getRandomWord(length: number): string {
    let wordArr = [];
    if(length == 4) wordArr = this.isogram_four_letter_words;
    else if(length == 5) wordArr = this.isogram_five_letter_words;
    else if(length == 6) wordArr = this.isogram_six_letter_words;
    else wordArr = wordList;
    let index = Math.floor(Math.random() * wordArr.length);
    return wordArr[index];
  }

  isIsogram (str) {
    return !/(.).*\1/.test(str);
  }
}
