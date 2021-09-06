import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { interval, Subject, timer } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ForexDomain } from '../domains/forex.domain';
import { Environment } from '../../../constants/config.constants';

@Injectable()
export class ForexScheduleJob implements OnModuleInit, OnModuleDestroy {

    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private configService: ConfigService,
        private forexDomain: ForexDomain
    ) {

    }

    public onModuleInit(): void {
        const interval = this.configService.get(Environment.StockConsumeInterval);

        this.createInterval(interval, () => this.forexDomain.uploadStock());
    }

    public onModuleDestroy(): any {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private createInterval(time: number, cb: (...args: Array<unknown>) => unknown): void {
        timer(0, time)
            .pipe()
            .subscribe(cb);
    }
}