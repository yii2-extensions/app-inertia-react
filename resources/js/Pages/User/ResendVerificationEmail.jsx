import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Mail } from "lucide-react";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";

const errorMessage = (errors, field) => {
  const value = errors?.[field];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
};

export default function ResendVerificationEmail() {
  const { props } = usePage();

  const form = useForm({
    ResendVerificationEmailForm: {
      email: "",
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("ResendVerificationEmailForm", {
      ...form.data.ResendVerificationEmailForm,
      [field]: value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post("/user/resend-verification-email", { preserveScroll: true });
  };

  return (
    <>
      <Head title="Resend verification email" />

      <AuthShell
        eyebrow="Verification"
        title="Resend the email."
        subtitle="We will send a fresh confirmation link to your inbox."
        brandTitle={"Verify your\naccount."}
        brandSubtitle="Did not receive the verification email? Request a new one and we will send it again."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <IconField
            id="resend-verification-email"
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoFocus
            autoComplete="email"
            value={form.data.ResendVerificationEmailForm.email}
            onChange={(value) => setField("email", value)}
            error={fieldError("email")}
          />

          <button
            type="submit"
            disabled={form.processing}
            className="btn-brand mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
          >
            Resend email
          </button>
        </form>

        <div className="mt-7">
          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already verified?{" "}
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
