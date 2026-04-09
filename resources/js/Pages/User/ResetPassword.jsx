import { Head, useForm, usePage } from "@inertiajs/react";
import { Lock } from "lucide-react";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";

const errorMessage = (errors, field) => {
  const value = errors?.[field];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
};

export default function ResetPassword({ token }) {
  const { props } = usePage();

  const form = useForm({
    ResetPasswordForm: {
      password: "",
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("ResetPasswordForm", {
      ...form.data.ResetPasswordForm,
      [field]: value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post(`/user/reset-password?token=${encodeURIComponent(token)}`, {
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title="Set your new password" />

      <AuthShell
        eyebrow="New password"
        title="Set a fresh one."
        subtitle="Please choose a new password for your account."
        brandTitle={"New\npassword."}
        brandSubtitle="Choose a strong password to keep your account secure."
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <IconField
            id="reset-password"
            label="New Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            autoFocus
            autoComplete="new-password"
            value={form.data.ResetPasswordForm.password}
            onChange={(value) => setField("password", value)}
            error={fieldError("password")}
          />

          <button
            type="submit"
            disabled={form.processing}
            className="btn-brand mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
          >
            Save password
          </button>
        </form>
      </AuthShell>
    </>
  );
}
