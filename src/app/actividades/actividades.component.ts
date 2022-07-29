import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Actividad } from './activiad';
import { ActividadesServiceService } from './actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
export class ActividadesComponent implements OnInit {
  actividad: Actividad[] = [];

  constructor(private actividadService: ActividadesServiceService) {}

  ngOnInit(): void {
    this.actividadService
      .getActividades()
      .subscribe((actividad) => (this.actividad = actividad));
  }

  delete(actividadD: Actividad): void {
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
        text: `¿Estas seguro que desea eliminar la actividad ${actividadD.nombreActividad} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.actividadService.delete(actividadD.id).subscribe((response) => {
            //Quitamos al cliente de la lista
            this.actividad = this.actividad.filter(
              (actv) => actv !== actividadD
            );

            //Mensaje
            swalWithBootstrapButtons.fire(
              'Actividad Eliminada',
              `Actividad ${actividadD.nombreAsignado} eliminado con exito.`,
              'success'
            );
          });
        }
      });
  }
}
