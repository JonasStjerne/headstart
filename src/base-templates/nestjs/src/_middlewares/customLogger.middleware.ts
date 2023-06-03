import { ConsoleLogger } from '@nestjs/common';
import * as Honeybadger from '@honeybadger-io/js';

export class CustomLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    Honeybadger.notify(message);
    super.error(message);
  }
}
