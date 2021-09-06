import { Injectable } from '@nestjs/common';
import * as nano from 'nano';
import * as docSchema from './schemas/stock/design.json';
import { DocumentScope, ServerScope } from 'nano';
import { IStockSchema } from './schemas/stock/schema';

const VALIDATION_ID = '_design/validation';

@Injectable()
export class DatabaseService {

    protected constructor(
        private db: DocumentScope<IStockSchema>
    ) {}

    public async createOrUpdate(doc: IStockSchema): Promise<string> {
        const _id = await this.getDocId(doc.name);

        if (_id) {
            await this.db.bulk({
                docs: [{ _id, ...doc }]
            });

            return _id;
        } else {
            const res = await this.db.insert(doc);

            return res.id;
        }
    }

    public async getDocId(name: string): Promise<string | undefined> {
        const result = await this.db.find({
            selector: {
                name: { '$eq': name }
            },
            fields: ['_id']
        });

        if (result.docs.length) {
            return result.docs[0]._id;
        }
    }

    public static async create(
        connectionUrl: string,
        databaseName: string
    ): Promise<DatabaseService> {
        const connection = nano(connectionUrl);
        const db = await this.createDatabase(connection, databaseName);

        await this.attachValidation(db);

        return new DatabaseService(db);
    }

    private static async attachValidation(db: DocumentScope<IStockSchema>): Promise<void> {
        let validationExist;

        try {
            validationExist = await db.get(VALIDATION_ID);
        } catch (e) {
            console.log('Schema validation is not exist');
        }

        if (!validationExist) {
            await db.insert(<any & object>docSchema, VALIDATION_ID);
        }
    }

    private static async createDatabase(
        connection: ServerScope,
        name: string
    ): Promise<DocumentScope<IStockSchema>> {
        try {
            const dbExist = await connection.db.get(name);

            return connection.db.use(dbExist.db_name);
        } catch (e) {
            await connection.db.create(name);

            return connection.db.use(name);
        }
    }
}