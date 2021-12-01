import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  nombreUsuario: string = '';

  constructor(private db: DbService, private router: Router, private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.cerrarSesion();
    });
  }

  ngOnInit() {
    this.db.obtenerNombre().then(data => {
      this.nombreUsuario = 'BIENVENIDO@: ' + data;
    })
  }

  cerrarSesion() {
    this.db.eliminarUsuario();
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
