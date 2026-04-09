import { cn } from "@/lib/utils";

/**
 * Inline error message for form fields, mirroring Yii2 model validation styling.
 *
 * Renders nothing when no message is provided.
 */
export function FormError({ message, className, ...props }) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      aria-live="polite"
      className={cn("mt-1 text-sm font-medium text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  );
}
