import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortAndFilter = ({
  onChangeHandler,
  search,
  onSelect,
  Clear,
  value,
}: {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  search: string;
  onSelect: (value: string) => void;
  Clear: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
}) => {
  return (
    <div className="flex w-full md:w-2/3 gap-4 text-black">
      <Input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={onChangeHandler}
        className="w-[100%]"
      />
      <Select onValueChange={onSelect} value={value}>
        <SelectTrigger className="w-1/2">
          <SelectValue placeholder="Select gender.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={Clear}>Clear All</Button>
    </div>
  );
};

export default SortAndFilter;
