import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Heroe } from "../interfaces/heroes.interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class HeroesService {
	private baseUrl: string = environment.baseUrl;

	constructor(private http: HttpClient) {}

	getHeroes(): Observable<Heroe[]> {
		return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
	}

	getHeroeById(id: string): Observable<Heroe> {
		return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
	}

	getSurgerencias(term: string): Observable<Heroe[]> {
		return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${term}`);
	}

	addHeroe(heroe: Heroe): Observable<Heroe> {
		return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
	}

	updatedHeroe(heroe: Heroe): Observable<Heroe> {
		console.log(heroe);
		return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
	}

	deleteHeroe(id: string): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
	}
}
