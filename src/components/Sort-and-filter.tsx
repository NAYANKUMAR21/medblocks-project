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
    <div className="flex w-full md:w-2/3 gap-4">
      <Input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={onChangeHandler}
        className="w-1/2 "
      />
      <Select onValueChange={onSelect} value={value}>
        <SelectTrigger className="w-1/2 ">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={Clear}>Clear All</Button>
    </div>
  );
};

export default SortAndFilter;
