import { Component, OnInit } from '@angular/core';
import { Country } from '../models/contry';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contries: Country[];
  pageSelected: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.clientState().subscribe((ready)=>{
      if(ready){
        this.loadGetContries();
      }
    })
  }

  loadGetContries(){
    this.dataService.getContinent().subscribe(data=>{
      this.contries = data;
      console.log('final',this.contries);

    })
  }

}
