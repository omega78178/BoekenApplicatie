import { labelClass, inputClass } from "./formStyles";

type TextFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

// Label + input in één. Door de <label> eromheen kun je op de tekst klikken
// om in het veld te komen.
function TextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: TextFieldProps) {
  return (
    <label className="self-stretch flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}

export default TextField;
