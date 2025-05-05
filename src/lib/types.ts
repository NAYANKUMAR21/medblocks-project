export type DataItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  date: string;
  address: string;
};
type Field = {
  name: string;
  dataTypeID: number;
};

type Row = {
  [key: string]: unknown;
};
export type DataResponseType = {
  rows: Row[];
  fields: Field[];
  totalCount?: number;
  offset?: number;
  limit?: number;
};
export type PatientFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
};
