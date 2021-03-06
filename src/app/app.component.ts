import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-chatapp';
  
  constructor(){}
  
  ngOnInit(){
    window.addEventListener("orientationchange", function() {
      console.log(">>>> oriented!");
      location.reload();
    }, false);
  }
}
