import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
