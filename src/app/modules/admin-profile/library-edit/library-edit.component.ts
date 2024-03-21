import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibraryService } from 'src/app/services/library.service';
import { AngularMaterialModule } from 'src/app/utils';

@Component({
  selector: 'app-library-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, AngularMaterialModule],
  templateUrl: './library-edit.component.html',
  styleUrls: ['./library-edit.component.scss'],
})
export class LibraryEditComponent {
editing:any;

@Input()
id:number=0;


constructor(
  private route: ActivatedRoute,
  private fb:FormBuilder,
  private libraryService: LibraryService,
  private router:Router,
  
  ) { 
    this.editing = this.fb.group({
      id: "",
      name: "",
      address: "",
      province: "",
      city: "",
      description:"",
      admins:[],
      password:'',
      confirm:'',
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id']; 
      
      this.libraryService.readLibrary(this.id).subscribe((res) =>{
        const adminsArray = res.admins.map(admin => this.fb.control(admin).value);
        
        this.editing.patchValue({
          id: this.id,
          name: res.name,
          address: res.address,
          province: res.province,
          city: res.city,
          description: res.description,
          admins: adminsArray,
        });
        console.log(this.editing.value)
      });
      
    });
    
  }

save():void{
  
  this.libraryService.updateLibrary(this.editing.value).subscribe({
    next: () =>{this.router.navigate(["/gestionale/adminprofile"])},
  })
}

delete():void{
  this.libraryService.deleteLibrary(this.id).subscribe({
    next:(res) => {
      this.router.navigateByUrl('/gestionale/adminprofile');
    },
  });
}

hidePassword = true;

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}

hideConfirmPassword = true;

toggleConfirmPasswordVisibility() {
  this.hideConfirmPassword = !this.hideConfirmPassword;
}
}
