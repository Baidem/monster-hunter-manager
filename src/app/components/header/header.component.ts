import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faHippo, faHouse, faShirt, faUmbrellaBeach, faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected$?: Observable<boolean>;

  iconHome: IconDefinition = faHouse;
  iconLogout: IconDefinition = faUser;
  iconLogo: IconDefinition = faHippo;
  iconSignOut: IconDefinition = faUser;
  iconArmor: IconDefinition = faShirt;

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isConnected$ = this.authService
      .token$
      .pipe(
        map((token:string | undefined) => Boolean(token))
      );
  }

  onClickSignOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/signin');
  }
}
