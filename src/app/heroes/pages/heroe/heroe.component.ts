import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Heroe } from "../../interfaces/heroes.interfaces";
import { HeroesService } from "../../services/heroes.service";

@Component({
	selector: "app-heroe",
	templateUrl: "./heroe.component.html",
	styles: [
		`
			img {
				width: 100%;
				border-radius: 5px;
			}
		`,
	],
})
export class HeroeComponent implements OnInit {
	heroe!: Heroe;

	constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService, private router: Router) {}

	ngOnInit(): void {
		this.activatedRoute.params.pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id))).subscribe((res: Heroe) => (this.heroe = res));
	}

	regresar() {
		this.router.navigate(["/heroes/listado"]);
	}
}
