import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Roles', url: 'roles' },
        { titulo: 'Aplicaciones', url: 'aplicaciones' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [   
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Roles', url: 'roles' },
        { titulo: 'Aplicaciones', url: 'aplicaciones' }   
      ]
    },
  ];

  constructor() { }
}
