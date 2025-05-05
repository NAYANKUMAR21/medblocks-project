import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "./components/PatientForm";
import PatientRecords from "./components/PatientRecords";
import SortAndFilter from "./components/Sort-and-filter";
import { useLiveIncrementalQuery } from "@electric-sql/pglite-react";
import { ChangeEvent, useEffect, useState } from "react";
// import SortAndFilter from "./components/Sort-and-filter";

// import PatientForm from "./components/PatientForm";
// import PatientRecords from "./components/PatientRecords";

export default function App() {
  const [gender, setGender] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [query, setQuery] = useState<string>(
    "SELECT * FROM Registry ORDER BY id;"
  );
  const data = useLiveIncrementalQuery(query, [], "id");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangeGender = (value: string): void => {
    setGender(value);
  };
  const handleClearSortAndFilter = () => {
    setGender("");
    setSearch("");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      let conditions: string[] = [];

      if (search.trim() !== "") {
        conditions.push(`firstName LIKE '%${search}%'`);
      }

      if (gender !== "") {
        conditions.push(`gender = '${gender}'`);
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
      setQuery(`SELECT * FROM Registry ${whereClause} ORDER BY id;`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, gender]);
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Patient Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientForm />
          </CardContent>

          <CardHeader className="mt-5">
            <CardTitle>Patient Records</CardTitle>
            <SortAndFilter
              value={gender}
              onChangeHandler={handleChange}
              search={search}
              onSelect={handleChangeGender}
              Clear={handleClearSortAndFilter}
            />
          </CardHeader>
          <CardContent>
            <PatientRecords data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
