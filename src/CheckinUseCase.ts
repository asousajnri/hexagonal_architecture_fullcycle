import ParkedCar from "./ParkedCarDomain";
import ParkedCarRepositoryPort from "./ParkedCarRepositoryPort";

export default class Checkin {

	constructor (readonly parkedCarRepositoryAdapter: ParkedCarRepositoryPort) {
	}

	async execute (input: Input): Promise<void> {
		await this.parkedCarRepositoryAdapter.save(
			new ParkedCar(input.plate, new Date(input.checkinDate))
		);
	}
}

type Input = {
	plate: string,
	checkinDate: string
}
