import { Component, OnInit } from "@angular/core";
import { Heroe } from "../../interfaces/heroes.interfaces";
import { FormControl } from "@angular/forms";
import { HeroesService } from "../../services/heroes.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Router } from "@angular/router";

@Component({
	selector: "app-input-search",
	templateUrl: "./input-search.component.html",
	styles: [],
})
export class InputSearchComponent implements OnInit {
	heroes: Heroe[] = [];

	constructor(private heroesService: HeroesService, private router: Router) {}

	ngOnInit(): void {}

	search = new FormControl("");

	buscando() {
		this.heroesService.getSurgerencias(this.search.value!.trim()).subscribe((res) => {
			this.heroes = res;
		});
	}

	opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
		if (!event.option.value) {
			return;
		}

		const heroe: Heroe = event.option.value;
		this.search.setValue(heroe.superhero);
		this.router.navigate([`/heroes/${heroe.id}`]);
	}
}
