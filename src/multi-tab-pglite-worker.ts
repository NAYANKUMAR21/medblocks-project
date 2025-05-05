import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init() {
    const db = await PGlite.create({
      dataDir: "idb://medblocks-project.db",
      extensions: {
        live,
      },
    });
    await db.exec(`
    CREATE TABLE IF NOT EXISTS Registry (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        phoneNumber VARCHAR(15),
        gender VARCHAR(10),
        date DATE,
        address TEXT
    );`);
    return db;
  },
});
