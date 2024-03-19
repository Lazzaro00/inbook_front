import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import { HeaderComponentUser } from 'src/app/modules/app-layout-user/header-user/header.component';
@Component({
  standalone: true,
  selector: 'app-userdetails',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [RouterModule, ProfileComponent, HeaderComponent, HeaderComponentUser],

})
export default class UserDetailsComponent {

}
