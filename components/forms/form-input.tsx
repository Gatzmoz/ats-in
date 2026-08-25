import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FormInput({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <Field className="mb-2">
      <FieldLabel>{label}</FieldLabel>
      <Input {...props} />
    </Field>
  );
}
