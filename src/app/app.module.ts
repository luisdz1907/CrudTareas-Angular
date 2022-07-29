import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importacion de mis componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './actividades/actividades.component';
import { FormComponent } from './empleados/form/form.component';
import { FormsModule } from '@angular/forms';
//Nos Permite conectarnos a nuestro servidor
import { HttpClientModule } from '@angular/common/http';
import { FormActvComponent } from './actividades/form-actv/form-actv.component';


//Definiendo mis rutas
const routes: Routes = [
  {path: '', redirectTo: '/actividades', pathMatch: 'full'},
  {path: 'actividades', component: ActividadesComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleados/form', component: FormComponent},
  {path: 'empleados/form/:id', component: FormComponent},
  {path: 'actividades/form-actv', component: FormActvComponent},
  {path: 'actividades/form-actv/:id', component: FormActvComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmpleadosComponent,
    ActividadesComponent,
    FormComponent,
    FormActvComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
