import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaulttOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaulttOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "./src/database/database.test.sqlite"
          : defaulttOptions.database,
    })
  );
};
