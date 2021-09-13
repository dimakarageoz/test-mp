import PouchDB from 'pouchdb';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { IStockTread } from '../../../models/stock.models';

@Injectable()
export class CouchServer {

  private db: PouchDB.Database | null = null;

  public async getStocks(): Promise<Array<IStockTread>> {
    const db = await this.getDatabaseConnection();

    if (!db) {
      return [];
    }

    const result = await db.allDocs();

    const ids = result.rows
      .filter(item => item.id !== '_design/validation')
      .map(item => item.id);

    return Promise.all(
      ids.map((id: string) => <Promise<IStockTread>>db.get(id))
    );
  }

  private async getDatabaseConnection(): Promise<PouchDB.Database | null> {
    if (this.db) {
      return this.db;
    }

    this.db = new PouchDB(ConfigService.get('STOCK_DATABASE'));

    try {
      await this.db.info();
    } catch (e) {
      this.db = null;

      console.log('Failed with connection to database')
    }

    return this.db;
  }
}
