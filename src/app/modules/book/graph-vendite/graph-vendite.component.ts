import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { LoginService } from 'src/app/services';
import { LibraryService } from 'src/app/services/library.service';


@Component({
  standalone: true,
  selector: 'graph-vendite',
  templateUrl: './graph-vendite.component.html',
  styleUrls: ['./graph-vendite.component.scss'],
  imports: [],
})

export class graphvendite {
  public chart: any;
  public idLibrary: number = 0;
  public data: any[] = [];
  constructor(
    private libraryService: LibraryService,
    private loginService: LoginService
    ){}

    ngOnInit(){
    let email = this.loginService.getUtenteSessione().email;
    let library = this.libraryService.getLibraryByEmail(email).subscribe({
      next: (res) => {
        console.log(res[0].id)
        this.libraryService.getSales(res[0].id).subscribe({
          next: (res) => {
            this.data = res.map( (res: any) => String(res));
            this.createChart();
          }
        })
        
      }
    })
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //TIPO DI GRAFICO

      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ], 
	       datasets: [
          {
            label: "Vendite",
            data: this.data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
