import { Component, Input, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-library-card',
  standalone: true,
  imports: [],
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.scss']
})
export class LibraryCardComponent implements OnInit{
  details:any;

  constructor(private libraryService:LibraryService, private router:Router){}

  @Input()
  id:number=0;

ngOnInit():void{
  this.getData();
}
  

getData():void{
  this.libraryService.readLibrary(this.id).subscribe((res) => {this.details = res});
}

edit(id:number):void{
  let navigationExtras: NavigationExtras = {
    queryParams: {
      id: this.id
    }
  };
  this.router.navigate(["gestionale/libraryedit"], navigationExtras);
}


}
