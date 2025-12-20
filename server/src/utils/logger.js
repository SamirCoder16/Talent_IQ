import winston from "winston";

const isProd = process.env.NODE_ENV === "production";

const colors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  http: "green",
  verbose: "magenta",
  debug: "white",
  silly: "grey",
};

winston.addColors(colors);

const logFormat = winston.format.printf(
  ({ timestamp, level, message }) =>
    `${timestamp} [${level}]: ${message}`
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }),
      logFormat
    ),
  }),
];

// ❗ ONLY LOCAL / DEV
if (!isProd) {
  transports.push(
    new winston.transports.File({
      filename: "logs/all.log",
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss A" }),
        logFormat
      ),
    })
  );
}

const logger = winston.createLogger({
  level: "silly",
  transports,
});

export default logger;
