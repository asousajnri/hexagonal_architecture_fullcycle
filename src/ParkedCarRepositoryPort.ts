import ParkedCar from "./ParkedCarDomain";

export default interface ParkedCarRepositoryPort {
	save (parkedCar: ParkedCar): Promise<void>;
	update (parkedCar: ParkedCar): Promise<void>;
	list (): Promise<ParkedCar[]>;
	get (plate: string): Promise<ParkedCar>;
}
