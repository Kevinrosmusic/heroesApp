import { Pipe, PipeTransform } from "@angular/core";
import memo from "memo-decorator";

@Pipe({
	name: "paginate",
})
export class PaginatePipe implements PipeTransform {
	transform(array: any[], pageSize: any | string, pageNumber: number): any[] {
		if (!array.length) {
			return [];
		}

		if (pageSize === "all") {
			return array;
		}

		pageSize = pageSize || 4;
		pageNumber = pageNumber || 1;

		--pageNumber;

		return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
	}
}
