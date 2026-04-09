import { FormError } from "@/Components/ui/form-error";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Form field with a leading icon, label, and inline error message.
 *
 * Designed for the auth and contact forms so every field renders identically without copy-pasting markup.
 */
export default function IconField({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoFocus,
  autoComplete,
}) {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div>
      <Label
        htmlFor={id}
        className="mb-1.5 block font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
      >
        {label}
      </Label>
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-lg border bg-background transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15",
          error
            ? "border-destructive focus-within:border-destructive focus-within:ring-destructive/15"
            : "border-input",
        )}
      >
        <Icon
          className="ml-3.5 size-[18px] shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className="w-full border-0 bg-transparent px-3 py-2.5 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground/60"
        />
      </div>
      <FormError id={errorId} message={error} />
    </div>
  );
}
