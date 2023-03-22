import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AgregarComponent } from "./pages/agregar/agregar.component";
import { BuscarComponent } from "./pages/buscar/buscar.component";
import { HeroeComponent } from "./pages/heroe/heroe.component";
import { ListadoComponent } from "./pages/listado/listado.component";
import { HeroesRoutingModule } from "./heroes-routing.module";
import { HomeComponent } from "./pages/home/home.component";
import { MaterialModule } from "../material/material.module";
import { HeroeTarjetaComponent } from "./components/heroe-tarjeta/heroe-tarjeta.component";
import { ImagenPipe } from "./pipes/imagen.pipe";
import { FormsModule } from "@angular/forms";
import { InputSearchComponent } from "./reactives/input-search/input-search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddFormComponent } from "./reactives/add-form/add-form.component";
import { PaginatePipe } from "./pipes/paginate.pipe";

@NgModule({
	declarations: [
		AgregarComponent,
		BuscarComponent,
		HeroeComponent,
		ListadoComponent,
		HomeComponent,
		HeroeTarjetaComponent,
		ImagenPipe,
		InputSearchComponent,
		AddFormComponent,
		PaginatePipe,
	],
	imports: [CommonModule, MaterialModule, HeroesRoutingModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
})
export class HeroesModule {}
