import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePGlite } from "@electric-sql/pglite-react";
import { validatePatientForm } from "@/lib/Validater";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  birthDate: "",
  address: "",
};
export default function PatientForm() {
  const [error, setError] = useState(initialState);
  const db = usePGlite();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { firstName, lastName, email, phone, gender, birthDate, address } =
        formData;
      const test = validatePatientForm(formData);
      console.log(formData);
      console.log(test);
      if (test && !test?.success) {
        setError(test.errors);
        return;
      }

      await db.query(
        `INSERT INTO Registry (firstName, lastName, email, phoneNumber, gender, date, address) VALUES ($1, $2, $3, $4, $5, $6,$7);`,
        [firstName, lastName, email, phone, gender, birthDate, address]
      );
      console.log("Form submitted Successfully..:", formData);
    } catch (er) {
      console.error("Database Error: ", er);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <Input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {error?.firstName && (
          <p className="text-red-500 text-xs mt-1">{error.firstName}</p>
        )}
      </div>

      <div>
        <Input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {error?.lastName && (
          <p className="text-red-500 text-xs mt-1">{error.lastName}</p>
        )}
      </div>

      <div>
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />
        {error?.email && (
          <p className="text-red-500 text-xs mt-1">{error.email}</p>
        )}
      </div>

      <div>
        <Input
          name="phone"
          type="number"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {error?.phone && (
          <p className="text-red-500 text-xs mt-1">{error.phone}</p>
        )}
      </div>

      <div>
        <Select onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {error?.gender && (
          <p className="text-red-500 text-xs mt-1">{error.gender}</p>
        )}
      </div>

      <div>
        <Input
          name="birthDate"
          placeholder="Birth Date"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {error?.birthDate && (
          <p className="text-red-500 text-xs mt-1">{error.birthDate}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <Input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {error?.address && (
          <p className="text-red-500 text-xs mt-1">{error.address}</p>
        )}
      </div>

      <Button className="md:col-span-2" type="submit">
        Register Patient
      </Button>
    </form>
  );
}
