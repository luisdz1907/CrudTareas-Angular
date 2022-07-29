import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './empleado';
import Swal from 'sweetalert2';
import { Icon } from 'ionicons/dist/types/components/icon/icon';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleado:Empleado[] = [];
  constructor(
    private empleadoService: EmpleadosService
  ) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados()
                        .subscribe((empleado) => this.empleado = empleado);
  }

  delete(empleado:Empleado): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        text: `¿Estas seguro que desea eliminar al cliente ${empleado.nombre} ${empleado.apellidos}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.empleadoService.delete(empleado.id).subscribe((response) => {
            //Quitamos al cliente de la lista
            this.empleado = this.empleado.filter((empl) => empl !== empleado);

            //Mensaje
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado',
              `Cliente ${empleado.nombre} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
}
