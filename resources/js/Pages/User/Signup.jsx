import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Lock, Mail, User } from "lucide-react";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";

const errorMessage = (errors, field) => {
  const value = errors?.[field];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
};

export default function Signup() {
  const { props } = usePage();

  const form = useForm({
    SignupForm: {
      username: "",
      email: "",
      password: "",
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("SignupForm", { ...form.data.SignupForm, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post("/user/signup", { preserveScroll: true });
  };

  return (
    <>
      <Head title="Create a new account" />

      <AuthShell
        eyebrow="Create account"
        title="Join the framework."
        subtitle="Fill out the fields below to get started."
        brandTitle={"Create your\naccount."}
        brandSubtitle="Join us and start building amazing applications with Yii2."
        brandMeta={[
          { label: "Edition", value: "0.1" },
          { label: "Free", value: "Always" },
          { label: "Stack", value: "PHP 8.5" },
          { label: "License", value: "BSD-3" },
        ]}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <IconField
            id="signup-username"
            label="Username"
            icon={User}
            placeholder="username"
            autoFocus
            autoComplete="username"
            value={form.data.SignupForm.username}
            onChange={(value) => setField("username", value)}
            error={fieldError("username")}
          />

          <IconField
            id="signup-email"
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            autoComplete="email"
            value={form.data.SignupForm.email}
            onChange={(value) => setField("email", value)}
            error={fieldError("email")}
          />

          <IconField
            id="signup-password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            autoComplete="new-password"
            value={form.data.SignupForm.password}
            onChange={(value) => setField("password", value)}
            error={fieldError("password")}
          />

          <button
            type="submit"
            disabled={form.processing}
            className="btn-brand mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
          >
            Sign up
          </button>
        </form>

        <div className="mt-7">
          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
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
