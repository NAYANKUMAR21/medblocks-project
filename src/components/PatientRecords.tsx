import { DateConverter } from "@/lib/formater";
import { useLiveIncrementalQuery } from "@electric-sql/pglite-react";

function PatientRecords() {
  const data = useLiveIncrementalQuery(
    `SELECT * FROM Registry ORDER BY id;`,
    [],
    "id"
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.rows.map((p: any, i: number) => (
              <tr key={i} className="border-t text-center">
                <td className="px-4 py-2">{p.firstname}</td>
                <td className="px-4 py-2">{p.lastname}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2">{p.gender}</td>
                <td className="px-4 py-2">{DateConverter(String(p.date))}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default PatientRecords;
