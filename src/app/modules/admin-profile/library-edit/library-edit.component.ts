import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-library-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.scss'],
})
export class LibraryEditComponent{
editing!:FormGroup;

@Input()
id:number=0;


constructor(
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private libraryService: LibraryService,
  private router:Router,
  ) { 
    this.libraryService.readLibrary(this.id).subscribe((res)=>
    this.editing = this.fb.group({
      id: this.id,
      address: res.address,
      province: res.province,
      city: res.city,
      description:res.description,
      admins:res.admins
    })
    )
  }

save():void{
  this.libraryService.updateLibrary(this.editing.value).subscribe({
    next: () =>{this.router.navigate(["/gestionale/adminprofile"])},
  })
}
}
