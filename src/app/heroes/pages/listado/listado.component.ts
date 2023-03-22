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
	heroes: Heroe[] = [];
	termino: string = "";
	pageSize: number = 4;
	pageNumber: number = 1;

	pageSizeOptions = [4, 8, 16, 32];

	constructor(private heroesServices: HeroesService) {}

	ngOnInit(): void {
		this.heroesServices.getHeroes().subscribe((res) => (this.heroes = res));
	}

	handlePage(e: PageEvent) {
		this.pageSize = e.pageSize;
		this.pageNumber = e.pageIndex + 1;
	}
}
