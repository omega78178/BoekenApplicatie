import type { ComponentProps } from "react";
import { labelClass, inputClass, inputErrorClass } from "./formStyles";
import { FieldError } from "../modals/FormModal";

// label + error zijn van ons, de rest (type, placeholder, en alles van register()) gaat naar de <input>
type TextFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string; // foutmelding onder het veld (bv. van zod)
};

// Label + input in één. Door de <label> eromheen kun je op de tekst klikken
// om in het veld te komen. Werkt met {...register("veld")} van react-hook-form.
function TextField({ label, error, type = "text", ...inputProps }: TextFieldProps) {
  return (
    <label className="self-stretch flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        {...inputProps}
        className={error ? inputErrorClass : inputClass}
      />
      <FieldError message={error} />
    </label>
  );
}

export default TextField;
