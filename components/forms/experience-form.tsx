import ExperienceInput from "@/components/experience-input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ExperienceForm({
  label,
  date,
}: {
  label: string;
  date?: boolean;
}) {
  return (
    <div
      className={`${label.toLowerCase().replace(/\s+/g, "-") || "default"} mb-2`}
    >
      <h2 className="text-xl font-bold text-blue-500">{label}</h2>
      <hr className="mb-2" />
      <ExperienceInput date={date} />
      <Button className="mt-2 p-5 w-full">
        Add {label} <Plus />
      </Button>
    </div>
  );
}
