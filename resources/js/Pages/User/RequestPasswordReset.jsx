import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Mail } from "lucide-react";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";

const errorMessage = (errors, field) => {
  const value = errors?.[field];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
};

export default function RequestPasswordReset() {
  const { props } = usePage();

  const form = useForm({
    PasswordResetRequestForm: {
      email: "",
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("PasswordResetRequestForm", {
      ...form.data.PasswordResetRequestForm,
      [field]: value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post("/user/request-password-reset", { preserveScroll: true });
  };

  return (
    <>
      <Head title="Reset your password" />

      <AuthShell
        eyebrow="Recovery"
        title="Forgot password?"
        subtitle="Enter your email and we will send a reset link."
        brandTitle={"Forgot your\npassword?"}
        brandSubtitle="No worries. Enter your email and we will send you a reset link."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <IconField
            id="reset-request-email"
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoFocus
            autoComplete="email"
            value={form.data.PasswordResetRequestForm.email}
            onChange={(value) => setField("email", value)}
            error={fieldError("email")}
          />

          <button
            type="submit"
            disabled={form.processing}
            className="btn-brand mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-7">
          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/user/login"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </AuthShell>
    </>
  );
}
