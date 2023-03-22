import { Component, Input } from "@angular/core";
import { Heroe } from "../../interfaces/heroes.interfaces";
import { HeroesService } from "../../services/heroes.service";
import Swal from "sweetalert2";

@Component({
	selector: "app-heroe-tarjeta",
	templateUrl: "./heroe-tarjeta.component.html",
	styles: [
		`
			mat-card {
				margin-top: 20px;
			}
		`,
	],
})
export class HeroeTarjetaComponent {
	constructor(private heroesService: HeroesService) {}
	@Input() heroe!: Heroe;

	delete(id: string) {
		Swal.fire({
			title: "Estas Seguro?",
			text: "¡No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, borrar!",
		}).then((result) => {
			if (result.isConfirmed) {
				this.heroesService.deleteHeroe(this.heroe.id!).subscribe();
				Swal.fire("Eliminado!", "El registro ha sido eliminado con exito", "success");
			}
		});
	}
}
