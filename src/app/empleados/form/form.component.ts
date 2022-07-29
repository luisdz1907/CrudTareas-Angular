import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadosService } from '../empleados.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public empleado: Empleado = new Empleado();

  constructor(
    private empleadoService: EmpleadosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  //Cargamos el empleado con su id
  cargarEmpleado(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Obtenemos el id por parametro
      let id = params['id'];

      if (id) {
        this.empleadoService
          .getEmpleado(id)
          .subscribe((empleado) => (this.empleado = empleado));
      }
    });
  }

  //Metodo crear
  public create(): void {
    if (
      this.empleado.nombre == null &&
      this.empleado.apellidos == null &&
      this.empleado.cedula == null &&
      this.empleado.fechaNaciemiento == null &&
      this.empleado.direccion == null &&
      this.empleado.telefono == null
    ) {
      Swal.fire('Campos Vacios', `Por favor complete los campos.`, 'error');
    } else {
      this.empleadoService.create(this.empleado).subscribe((response) => {
        this.router.navigate(['/empleados']); //Redirecionamos una vez creado

        Swal.fire(
          'Nuevo Cliente',
          `Empledo ${this.empleado.nombre} creado con exito.`,
          'success'
        );
      });
    }
  }

  //Metodo Actualizar
  update(): void {
    this.empleadoService.update(this.empleado).subscribe((empleado) => {
      this.router.navigate(['/empleados']);
      Swal.fire(
        'Empleado Actualizado',
        `Empledo ${this.empleado.nombre} actualizado con exito.`,
        'success'
      );
    });
  }
}
