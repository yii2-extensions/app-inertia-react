import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success:
          "border-success/50 text-success bg-success/10 [&>svg]:text-success dark:border-success",
        destructive:
          "border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive dark:border-destructive",
        info: "border-primary/50 text-primary bg-primary/10 [&>svg]:text-primary dark:border-primary",
        warning: "border-amber-500/50 text-amber-700 dark:text-amber-400 bg-amber-500/10 [&>svg]:text-amber-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef(function Alert({ className, variant, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

const AlertTitle = React.forwardRef(function AlertTitle({ className, ...props }, ref) {
  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
});

const AlertDescription = React.forwardRef(function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
});

export { Alert, AlertTitle, AlertDescription };
