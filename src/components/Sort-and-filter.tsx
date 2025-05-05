import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SortAndFilter = () => {
  return (
    <div className="flex w-full md:w-2/3 gap-4">
      <Input
        type="text"
        placeholder="Search by name or email..."
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
        className="w-1/2 "
      />
      <Select
      // onValueChange={setGenderFilter}
      >
        <SelectTrigger className="w-1/2 ">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortAndFilter;
