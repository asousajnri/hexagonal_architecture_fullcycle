import ConnectionPort from "./ConnectionPort";
import pgp from "pg-promise";

export default class PostgreSQLAdapter implements ConnectionPort {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:postgres@localhost:5032/ports_adapters_branas");
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	one(statement: string, params: any): Promise<any> {
		return this.connection.one(statement, params);
	}

	close(): Promise<void> {
		return this.connection.$pool.end();
	}
	
}
