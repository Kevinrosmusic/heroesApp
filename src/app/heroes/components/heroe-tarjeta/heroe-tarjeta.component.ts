import { Component, Input } from "@angular/core";
import { Heroe } from "../../interfaces/heroes.interfaces";
import { HeroesService } from "../../services/heroes.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

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
	constructor(public heroesService: HeroesService, private router: Router) {}
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
				this.heroesService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
					let index: number = 0;
					for (const key in this.heroesService.heroesBase) {
						if (Object.prototype.hasOwnProperty.call(this.heroesService.heroesBase, key)) {
							const item = this.heroesService.heroesBase[key];
							if (item.id === this.heroe.id) {
								index = Number(key);
								break;
							}
						}
					}
					this.heroesService.heroesBase.splice(index, 1);
					this.heroesService.isDeleted.emit({
						deleted: true,
					});
					
					const Msg = Swal.mixin({
						timer: 3000
					})
					Msg.fire("Eliminado!", "El registro ha sido eliminado con exito", "success");
				});
			}
		});
	}
}
