import type { HTMLInputTypeAttribute, ChangeEvent } from "react";

type InputProps = {
  label: string;
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
  hint?: string;
  id?: string;

  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  error?: string;
  disabled?: boolean;
};

export const Input = ({
  label,
  type = "text",
  isRequired = false,
  hint,
  id,
  value,
  defaultValue,
  onChange,
  error,
  disabled = false,
}: InputProps) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const helperId = `${inputId}-helper`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {isRequired && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={inputId}
        type={type}
        required={isRequired}
        aria-required={isRequired}
        aria-invalid={!!error}
        aria-describedby={hint || error ? helperId : undefined}
        placeholder={hint}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full rounded-xl border px-4 py-3 outline-none transition-all
          bg-surface
          ${error ? "border-red-500 focus:ring-red-500" : "border-border focus:border-primary focus:ring-primary"}
          focus:ring-1
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />

      {(error) && (
        <p
          id={helperId}
          className={`text-sm ${error ? "text-red-500" : "text-muted-foreground"}`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
