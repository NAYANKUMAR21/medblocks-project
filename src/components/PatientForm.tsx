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

export default function PatientForm() {
  const db = usePGlite();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    address: "",
  });

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
      <Input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <Input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />
      <Select onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="birthDate"
        placeholder="Birth Date"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
      />
      <Input
        name="address"
        placeholder="Address"
        className="md:col-span-2"
        value={formData.address}
        onChange={handleChange}
      />
      <Button className="md:col-span-2" type="submit">
        Register Patient
      </Button>
    </form>
  );
}
