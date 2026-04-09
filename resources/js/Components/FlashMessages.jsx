import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { X } from "lucide-react";

import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";

const variantMap = {
  success: "success",
  error: "destructive",
  danger: "destructive",
  info: "info",
  warning: "warning",
};

/**
 * Renders Yii2 flash messages forwarded by the Inertia adapter as dismissible shadcn alerts.
 */
export default function FlashMessages() {
  const { props } = usePage();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const flash = props.flash;

    if (!flash || typeof flash !== "object") {
      setAlerts([]);
      return;
    }

    const next = Object.entries(flash)
      .filter(([, message]) => Boolean(message))
      .map(([type, message]) => ({
        id: crypto.randomUUID(),
        variant: variantMap[type] || "info",
        message,
      }));

    setAlerts(next);
  }, [props.flash]);

  if (alerts.length === 0) {
    return null;
  }

  const dismiss = (id) => setAlerts((current) => current.filter((alert) => alert.id !== id));

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.variant} className="pr-12">
          <AlertDescription>{alert.message}</AlertDescription>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 size-7 text-current hover:bg-transparent hover:opacity-70"
            onClick={() => dismiss(alert.id)}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </Button>
        </Alert>
      ))}
    </div>
  );
}
