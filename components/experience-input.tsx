import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ExperienceInput(date?: { date?: boolean }) {
  return (
    <Card className="gap-0 p-4">
      <FormInput
        label="Institution Name"
        type="text"
        placeholder="Enter the institution name"
      />
      <FormInput
        label="Position"
        type="text"
        placeholder="Enter your position"
      />
      <FormInput label="Start Date" type="date" />
      <FormInput label="End Date" type="date" />
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          className="resize-none"
          placeholder="Describe your experience"
        ></Textarea>
      </Field>
    </Card>
  );
}

export default ExperienceInput;
