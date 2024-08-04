import express, { Request, response, Response } from "express";
import Checkin from "./CheckinUseCase";
import Checkout from "./CheckoutUseCase";
import GetParkedCars from "./GetParkedCarsUseCase";
import ParkedCarDatabaseRepositoryAdapter from "./ParkedCarDatabaseRepositoryAdapter";
import PostgreSQLAdapter from "./PostgreSQLAdapter";
const app = express();
app.use(express.json());
const db = new PostgreSQLAdapter();
const parkedCarRepository = new ParkedCarDatabaseRepositoryAdapter(db);
app.post("/checkin", async function (request: Request, response: Response) {
	const checkin = new Checkin(parkedCarRepository);
	await checkin.execute({ plate: request.body.plate, checkinDate: request.body.checkinDate });
	response.end();
});
app.get("/parked_cars", async function (request: Request, response: Response) {
	const getParkedCars = new GetParkedCars(parkedCarRepository);
	const parkedCars = await getParkedCars.execute();
	response.json(parkedCars);
});
app.post("/checkout", async function (request: Request, response: Response) {
	const checkout = new Checkout(parkedCarRepository);
	const ticket = await checkout.execute({ plate: request.body.plate, checkoutDate: request.body.checkoutDate });
	response.json(ticket);
});
app.listen(3000);
