import {
  createLogger,
  format,
  transports
} from 'winston';

import moment from 'moment';

const logTransports = [
  new transports.File({
    level: 'error',
    filename: `./logs/${moment().format('DD-MMM-YYYY')}/Activity-${moment().format('hha')}.log`,
    format: format.json({
      replacer: (key, value) => {
        if (key === 'error') {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack
          };
        }
        return value;
      }
    })
  }),
  new transports.Console({
    level: 'debug',
    format: format.prettyPrint()
  }),
  new transports.File({
    level: 'info',
    filename: `./logs/${moment().format('DD-MMM-YYYY')}/Activity-${moment().format('hha')}.log`,
    format: format.prettyPrint()
  })
];

export const logger = createLogger({
  format: format.combine(
    format.timestamp()
  ),
  transports: logTransports,
  defaultMeta: { service: 'api' }
});
