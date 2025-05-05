import { PatientFormData } from "./types";

export type ValidationResult =
  | { success: true }
  | { success: false; errors: Record<keyof PatientFormData, string> };

const patientFormRegex: Record<keyof PatientFormData, RegExp> = {
  firstName: /^[a-zA-Z]{2,50}$/,
  lastName: /^[a-zA-Z]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[6-9]\d{9}$/,
  gender: /^(Male|Female|Other)$/,
  birthDate: /^\d{4}-\d{2}-\d{2}$/,
  address: /^.{5,100}$/,
};

export function validatePatientForm(
  formData: PatientFormData
): ValidationResult {
  const errors = {} as Record<keyof PatientFormData, string>;

  for (const field in patientFormRegex) {
    const key = field as keyof PatientFormData;
    const value = formData[key];
    const regex = patientFormRegex[key];

    if (!value || !regex.test(value)) {
      errors[key] = `Invalid ${key}`;
    }
  }

  return Object.keys(errors).length === 0
    ? { success: true }
    : { success: false, errors };
}
