import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SplashPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Muestra el splash por 2.5 segundos y luego va al home
    setTimeout(() => {
      this.router.navigate(['/home'], { replaceUrl: true });
    }, 2500);
  }
}