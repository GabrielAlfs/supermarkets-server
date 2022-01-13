import { LoggerOptions, createLogger, transports, format } from 'winston';

const { combine, prettyPrint, colorize, simple } = format;

const logConfigurations: LoggerOptions = {
  transports: [
    new transports.Console({
      format: combine(colorize(), prettyPrint(), simple()),
    }),
    new transports.File({
      filename: './logs/server.log',
    }),
  ],
};

export const serverLogger = createLogger(logConfigurations);
