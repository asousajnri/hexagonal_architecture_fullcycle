import pgp from "pg-promise";
import ParkedCarRepositoryPort from "./ParkedCarRepositoryPort";

export default class GetParkedCars {

	constructor (readonly parkedCarRepositoryAdapter: ParkedCarRepositoryPort) {
	}

	async execute (): Promise<Output[]> {
		const parkedCars = await this.parkedCarRepositoryAdapter.list();
		return parkedCars;
	}
}

type Output = {
	plate: string,
	checkinDate: Date
}