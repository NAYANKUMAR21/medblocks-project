import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { live } from "@electric-sql/pglite/live";
import { PGliteProvider } from "@electric-sql/pglite-react";
const root = createRoot(document.getElementById("root")!);

(async function initialise() {
  try {
    // checking if that is persisted
    const isPersisted = await navigator.storage.persist();
    console.log(`Storage persistence granted: ${isPersisted}`);

    // if not convert it to yes
    const isPersistent = await navigator.storage.persisted();
    console.log(`Is persistent already? ${isPersistent}`);

    //creation of main worker
    const SetUpWorker = new Worker(
      new URL("./multi-tab-pglite-worker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    // DB from the main node

    const db = await PGliteWorker.create(SetUpWorker, {
      extensions: { live },
      dataDir: "idb://medblocks-project.db",
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

    // render along with provider
    root.render(
      <PGliteProvider db={db}>
        <App />
      </PGliteProvider>
    );
  } catch (er) {
    console.error("Database connection failed: ", er);
    root.render(
      <div>
        <div className="text-red text-2xl">
          Failed to initialise the database:
        </div>
        <div className="text-red text-xl">
          Please check your browser storage settings or try again
        </div>
      </div>
    );
  }
})();
