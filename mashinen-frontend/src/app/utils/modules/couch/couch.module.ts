import { NgModule } from '@angular/core';
import { CouchServer } from './couch.service';

@NgModule({
  providers: [CouchServer]
})
export class CouchModule {}
