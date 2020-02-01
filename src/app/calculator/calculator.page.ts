import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'], // './calculator.page.scss',
})
export class CalculatorPage implements OnInit {
  Currents: any;
  FlagNewNum: any;
  PendingOp: any;

  constructor() { 
  }

  ngOnInit() {
    this.Currents = 0;
    document.getElementById('viewer').innerText = this.Currents;
    this.FlagNewNum = true;
    this.PendingOp = "";
  }
  NumPressed(Num){

    if(this.FlagNewNum){
      document.getElementById('viewer').innerText = Num;
      this.FlagNewNum = false;
    }else{
      if(document.getElementById('viewer').innerText == "0"){
        document.getElementById('viewer').innerText = Num;
      }else{
        document.getElementById('viewer').innerText += Num;
      }
    }
  }

  Operation(Op){
    let ReadOut = document.getElementById('viewer').innerText;
    if(this.FlagNewNum && this.PendingOp != "="){
      document.getElementById('viewer').innerText = this.Currents;
    }else{
      this.FlagNewNum = true;
      if ('+' == this.PendingOp)
        this.Currents += parseFloat(ReadOut);
      else if ('-' == this.PendingOp)
        this.Currents -= parseFloat(ReadOut);
      else if ('*' == this.PendingOp)
        this.Currents *= parseFloat(ReadOut);
      else if ('/' == this.PendingOp)
        this.Currents /= parseFloat(ReadOut);
      else 
        this.Currents = parseFloat(ReadOut);
      
      document.getElementById('viewer').innerText = this.Currents;
      this.PendingOp = Op;
    }
  }

  Decimal(){
    let curReadOut = document.getElementById('viewer').innerText;
    if (this.FlagNewNum){
      curReadOut = "0.";
      this.FlagNewNum = false;
    } else {
      if (curReadOut.indexOf(".") == -1)
          curReadOut += ".";
    }
    document.getElementById('viewer').innerText = curReadOut;
  }

  ClearEntry(){
    document.getElementById('viewer').innerText = "0";
    this.FlagNewNum = true;
  }

  Clear(){
    this.Currents = 0;
    this.PendingOp = "";
    this.ClearEntry();
  }
}