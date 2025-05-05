import { usePGlite } from "@electric-sql/pglite-react";
import { Button } from "./components/ui/button";

function App() {
  const db = usePGlite();
  console.log(db);
  return <Button>Welcome App</Button>;
}
export default App;
