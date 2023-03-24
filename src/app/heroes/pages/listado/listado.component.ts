import Swal from "sweetalert2";
import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Heroe } from "../../interfaces/heroes.interfaces";
import { HeroesService } from "../../services/heroes.service";

@Component({
	selector: "app-listado",
	templateUrl: "./listado.component.html",
	styles: [],
})
export class ListadoComponent implements OnInit {
	termino: string = "";
	pageSize: number = 4;
	pageNumber: number = 1;

	pageSizeOptions = [4, 8, 16, 32];

	constructor(public heroesServices: HeroesService) {
		this.heroesServices.isDeleted.subscribe((data) => {
			if (data.deleted) {
				this.loadHeroes();
			}
		});
	}

	ngOnInit(): void {
		this.heroesServices.getHeroes().subscribe((res) => {
			this.heroesServices.heroesBase = res;
			this.loadHeroes();
		});
	}

	loadHeroes() {
		this.heroesServices.heroesShow = [];
		let desde = Number(this.pageNumber - 1) * this.pageSize;
		let hasta = (this.pageNumber * this.pageSize) - 1;
		for (const key in this.heroesServices.heroesBase) {
			if (Object.prototype.hasOwnProperty.call(this.heroesServices.heroesBase, key)) {
				const heroe = this.heroesServices.heroesBase[key];
				if (Number(key) >= desde && Number(key) <= hasta) {
					this.heroesServices.heroesShow.push(heroe);
				}
			}
		}
	}

	handlePage(e: PageEvent) {
		this.pageSize = e.pageSize;
		this.pageNumber = e.pageIndex + 1;
		this.loadHeroes();
	}
}
