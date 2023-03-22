import { Component, OnInit } from "@angular/core";
import { Heroe, Publisher } from "../../interfaces/heroes.interfaces";
import { FormBuilder, Validators } from "@angular/forms";
import { HeroesService } from "../../services/heroes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "app-add-form",
	templateUrl: "./add-form.component.html",
	styles: [
		`
			img {
				width: 100%;
				border-radius: 5px;
			}
		`,
	],
})
export class AddFormComponent implements OnInit {
	constructor(private fb: FormBuilder, private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) {}
	title: string = "";
	heroe: Heroe = {
		superhero: "",
		alter_ego: "",
		characters: "",
		first_appearance: "",
		publisher: Publisher.DCComics,
		alt_img: "",
	};

	ngOnInit(): void {
		if (this.router.url.includes("editar")) {
			this.activatedRoute.params.pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id))).subscribe((res) => {
				this.heroe = res;
				this.addForm.patchValue({
					id: res.id,
					superhero: res.superhero,
					alter_ego: res.alter_ego,
					characters: res.characters,
					first_appearance: res.first_appearance,
					publisher: res.publisher,
					alt_img: res.alt_img,
				});
			});
		}
	}

	publishers = [
		{
			id: "DC Comics",
			desc: "DC - Comics",
		},
		{
			id: "Marvel Comics",
			desc: "Marvel - Comics",
		},
	];

	addForm = this.fb.group({
		id: [""],
		superhero: ["", Validators.required],
		alter_ego: ["", Validators.required],
		characters: ["", Validators.required],
		first_appearance: ["", Validators.required],
		publisher: ["", Validators.required],
		alt_img: ["", Validators.required],
	});

	onSubmit() {
		if (this.heroe.id) {
			//actualizar
			this.heroesService.updatedHeroe(this.addForm.value as Heroe).subscribe((res) => {
				this.router.navigate(["/heroes/listado"]);
				this.mostratSnackBar("Registro Actalizado");
			});
		} else {
			//crear
			this.heroesService.addHeroe(this.addForm.value as Heroe).subscribe((res) => {
				this.router.navigate(["/heroes/listado"]);
				this.mostratSnackBar("Registro Creado");
			});
		}
	}

	mostratSnackBar(mensaje: string) {
		this.snackBar.open(mensaje, "X", {
			duration: 2500,
		});
	}
}
