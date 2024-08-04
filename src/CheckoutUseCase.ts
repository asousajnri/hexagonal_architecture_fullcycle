import parkedCarRepositoryPort from "./ParkedCarRepositoryPort";

export default class Checkout {

	constructor (readonly parkedCarRepositoryAdapter: parkedCarRepositoryPort) {
	}

	async execute (input: Input): Promise<Output> {
		const parkedCar = await this.parkedCarRepositoryAdapter.get(input.plate);
		parkedCar.checkout(input.checkoutDate);
		await this.parkedCarRepositoryAdapter.update(parkedCar);
		return {
			price: parkedCar.price,
			period: parkedCar.diff
		};
	}
}

type Input = {
	plate: string,
	checkoutDate: string
}

type Output = {
	price?: number,
	period?: number
}