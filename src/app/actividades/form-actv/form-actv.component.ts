import { Component, OnInit } from '@angular/core';
import { Actividad } from '../activiad';
import { Router, ActivatedRoute } from '@angular/router';
import { ActividadesServiceService } from '../actividades.service';
import Swal from 'sweetalert2';
import { Empleado } from '../../empleados/empleado';
import { EmpleadosService } from '../../empleados/empleados.service';

@Component({
  selector: 'app-form-actv',
  templateUrl: './form-actv.component.html',
  styleUrls: ['./form-actv.component.css'],
})
export class FormActvComponent implements OnInit {
  public actividad: Actividad = new Actividad();
  empleado: Empleado[] = [];
  constructor(
    private actividadesServices: ActividadesServiceService,
    private empleadoService: EmpleadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.cargarActividad();

    this.empleadoService
      .getEmpleados()
      .subscribe((empleado) => (this.empleado = empleado));
  }

  //Cargamos la actividad con su id
  cargarActividad(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Obtenemos el id por parametro
      let id = params['id'];

      if (id) {
        this.actividadesServices
          .getActividad(id)
          .subscribe((actividad) => (this.actividad = actividad));
      }
    });
  }

  //Metodo crear
  public create(): void {
    if (
      this.actividad.nombreActividad == null &&
      this.actividad.estatus == null &&
      this.actividad.nombreAsignado == null &&
      this.actividad.horaEjecucion == null
    ) {
      Swal.fire('Campos Vacios', `Por favor complete los campos.`, 'error');
    } else {

      let milsDia = 24 * 60 * 60* 1000;
      let milsTranscurridos = Math.abs((new Date('07/01/2022')).getTime() - (new Date()).getTime());
      let dia = Math.round(milsTranscurridos / milsDia);


      this.actividadesServices.create(this.actividad).subscribe((response) => {
        this.router.navigate(['/actividades']); //Redirecionamos una vez creado

        Swal.fire(
          'Nueva Actividad',
          `La Actividad ${this.actividad.nombreActividad} fue creado con exito.`,
          'success'
        );
      });
    }
  }

  update(): void {
    this.actividadesServices.update(this.actividad).subscribe((actividad) => {
      this.router.navigate(['/actividades']);
      Swal.fire(
        'Actividad Actualizado',
        `La Actividad ${this.actividad.nombreActividad} actualizado con exito.`,
        'success'
      );
    });
  }
}
