import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite, private router: Router) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(USER VARCHAR(30), ' +
        'PASS VARCHAR(30))', []).then(() => {
          console.log('FSR: TABLA USUARIO CREADA CORRECTAMENTE');
        }).catch(e => {
          console.log('FSR: ERROR AL CREAR TABLA USUARIO');
        })
    }).catch(e => {
      console.log('FSR: ERROR AL CREAR BASE DE DATOS');
    })
  }

  almacenarUsuario(usuario, contrasena) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO USUARIO VALUES(?, ?)', [usuario, contrasena]).then(() => {
        console.log('FSR: USUARIO ALMACENADO CORRECTAMENTE');
      }).catch(e => {
        console.log('FSR: ERROR AL ALMACENAR USUARIO');
      })
    }).catch(e => {
      console.log('FSR: ERROR AL CREAR BASE DE DATOS');
    })
  }

  eliminarUsuario() {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM USUARIO', []).then(() => {
        console.log('FSR: USUARIO ELIMINADO CORRECTAMENTE');
      }).catch(e => {
        console.log('FSR: ERROR AL ELIMINAR USUARIO');
      })
    }).catch(e => {
      console.log('FSR: ERROR AL CREAR BASE DE DATOS');
    })
  }

  obtenerCantidadUsuarios() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT COUNT(USER) AS CANTIDAD FROM USUARIO', []).then((data) => {
        return data.rows.item(0).CANTIDAD;
      }).catch(e => {
        console.log('FSR: ERROR AL OBTENER CANTIDAD DE USUARIOS');
        return 99;
      })
    }).catch(e => {
      console.log('FSR: ERROR AL CREAR BASE DE DATOS');
      return 99;
    })
  }

  obtenerNombre() {
    return this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT USER FROM USUARIO', []).then((data) => {
        return data.rows.item(0).USER;
      }).catch(e => {
        console.log('FSR: ERROR AL OBTENER CANTIDAD DE USUARIOS');
        return '';
      })
    }).catch(e => {
      console.log('FSR: ERROR AL CREAR BASE DE DATOS');
      return '';
    })
  }

  canActivate() {
    this.obtenerCantidadUsuarios().then(data => {
      if (data === 1) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    })

    return true;
  }
}
