import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientForm from "./components/PatientForm";
import PatientRecords from "./components/PatientRecords";
import SortAndFilter from "./components/Sort-and-filter";
// import SortAndFilter from "./components/Sort-and-filter";

// import PatientForm from "./components/PatientForm";
// import PatientRecords from "./components/PatientRecords";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="register">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="register">Register Patient</TabsTrigger>
            <TabsTrigger value="records">Patient Records</TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Patient Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientForm />
              </CardContent>

              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
                <SortAndFilter />
              </CardHeader>
              <CardContent>
                <PatientRecords />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Patient Records</CardTitle>
              </CardHeader>
              <CardContent>
                <PatientRecords />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
