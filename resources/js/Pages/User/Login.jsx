import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Lock, User } from "lucide-react";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";

const errorMessage = (errors, field) => {
  const value = errors?.[field];
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === "string" ? value : null;
};

export default function Login() {
  const { props } = usePage();

  const form = useForm({
    LoginForm: {
      username: "",
      password: "",
      rememberMe: true,
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("LoginForm", { ...form.data.LoginForm, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post("/user/login", { preserveScroll: true });
  };

  return (
    <>
      <Head title="Login to your account" />

      <AuthShell
        eyebrow="Sign in"
        title="Login to your account."
        subtitle="Enter your credentials to continue."
        brandTitle={"Welcome\nback."}
        brandSubtitle="Log in to access your Yii2 application and manage your account."
        brandMeta={[
          { label: "Edition", value: "0.1" },
          { label: "Adapter", value: "Inertia v3" },
          { label: "Framework", value: "Yii2" },
          { label: "Client", value: "React 19" },
        ]}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <IconField
            id="login-username"
            label="Username"
            icon={User}
            placeholder="admin"
            autoFocus
            autoComplete="username"
            value={form.data.LoginForm.username}
            onChange={(value) => setField("username", value)}
            error={fieldError("username")}
          />

          <IconField
            id="login-password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            autoComplete="current-password"
            value={form.data.LoginForm.password}
            onChange={(value) => setField("password", value)}
            error={fieldError("password")}
          />

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.data.LoginForm.rememberMe}
              onChange={(event) => setField("rememberMe", event.target.checked)}
              className="size-4 cursor-pointer rounded border-input text-primary focus:ring-ring"
            />
            <span className="text-foreground">Remember me</span>
          </label>

          <button
            type="submit"
            disabled={form.processing}
            className="btn-brand mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
          >
            Sign in
          </button>
        </form>

        <div className="mt-7">
          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/user/signup"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/user/request-password-reset"
                className="text-primary underline-offset-4 hover:underline"
              >
                Forgot password
              </Link>
              <span className="text-border" aria-hidden="true">
                |
              </span>
              <Link
                href="/user/resend-verification-email"
                className="text-primary underline-offset-4 hover:underline"
              >
                Resend verification
              </Link>
            </div>
          </div>
        </div>
      </AuthShell>
    </>
  );
}
