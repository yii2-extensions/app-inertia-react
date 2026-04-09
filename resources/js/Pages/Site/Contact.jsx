import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { Turnstile } from "react-turnstile";

import AuthShell from "@/Components/AuthShell";
import IconField from "@/Components/IconField";
import { FormError } from "@/Components/ui/form-error";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

const maskPhoneValue = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length >= 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length >= 4) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  if (digits.length >= 1) {
    return `(${digits}`;
  }

  return "";
};

const errorMessage = (errors, field) => {
  const value = errors?.[field];

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return typeof value === "string" ? value : null;
};

export default function Contact() {
  const { props } = usePage();

  const form = useForm({
    ContactForm: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      body: "",
      turnstileToken: "",
    },
  });

  const fieldError = (key) => errorMessage(props.errors, key);

  const setField = (field, value) =>
    form.setData("ContactForm", { ...form.data.ContactForm, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.post("/site/contact", { preserveScroll: true });
  };

  if (props.flash?.success) {
    return (
      <>
        <Head title="Contact us" />

        <AuthShell
          eyebrow="Message sent"
          title="Thanks, we got it."
          subtitle="We will reply as soon as we can."
          brandTitle={"Message\nreceived."}
          brandSubtitle="Thanks for reaching out. We will reply as soon as we can."
        >
          <div className="flex flex-col gap-5 text-center">
            <p className="text-sm text-muted-foreground">
              Your message has been delivered to the team. Want to send another
              note?
            </p>
            <Link
              href="/site/contact"
              className="btn-brand inline-flex h-12 w-full items-center justify-center rounded-lg text-[0.95rem]"
            >
              Send another message
            </Link>
          </div>
        </AuthShell>
      </>
    );
  }

  return (
    <>
      <Head title="Contact us" />

      <AuthShell
        eyebrow="Get in touch"
        title="Contact us."
        subtitle="Fill out the form below and we will get back to you."
        brandTitle={"Get in\ntouch."}
        brandSubtitle="Have a question or business inquiry? We would love to hear from you."
        brandMeta={[
          { label: "Channel", value: "Email" },
          { label: "Reply", value: "< 48h" },
          { label: "Languages", value: "EN · ES" },
          { label: "Timezone", value: "UTC-05" },
        ]}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <IconField
              id="contact-name"
              label="Name"
              icon={User}
              placeholder="Jane Doe"
              autoFocus
              autoComplete="name"
              value={form.data.ContactForm.name}
              onChange={(value) => setField("name", value)}
              error={fieldError("name")}
            />
            <IconField
              id="contact-email"
              label="Email"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              autoComplete="email"
              value={form.data.ContactForm.email}
              onChange={(value) => setField("email", value)}
              error={fieldError("email")}
            />
          </div>

          <IconField
            id="contact-phone"
            label="Phone"
            icon={Phone}
            placeholder="(999) 999-9999"
            autoComplete="tel"
            value={form.data.ContactForm.phone}
            onChange={(value) => setField("phone", maskPhoneValue(value))}
            error={fieldError("phone")}
          />

          <IconField
            id="contact-subject"
            label="Subject"
            icon={MessageSquare}
            placeholder="What is this about?"
            value={form.data.ContactForm.subject}
            onChange={(value) => setField("subject", value)}
            error={fieldError("subject")}
          />

          <div>
            <Label
              htmlFor="contact-body"
              className="mb-1 block font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              Message
            </Label>
            <textarea
              id="contact-body"
              value={form.data.ContactForm.body}
              onChange={(event) => setField("body", event.target.value)}
              placeholder="Your message..."
              className={cn(
                "h-[80px] w-full rounded-lg border bg-background px-3.5 py-2 text-[0.92rem] text-foreground placeholder:text-muted-foreground/60 transition-all focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
                fieldError("body")
                  ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/15"
                  : "border-input",
              )}
            />
            <FormError message={fieldError("body")} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Turnstile
              sitekey={props.turnstileSiteKey}
              theme="auto"
              onVerify={(token) => setField("turnstileToken", token)}
              onExpire={() => setField("turnstileToken", "")}
            />
            <button
              type="submit"
              disabled={
                form.processing || !form.data.ContactForm.turnstileToken
              }
              className="btn-brand inline-flex h-[44px] items-center justify-center rounded-lg px-7 text-[0.92rem]"
            >
              Send message
            </button>
          </div>
          <FormError message={fieldError("turnstileToken")} />
        </form>

        <div className="mt-4">
          <div className="auth-divider">
            <span>or</span>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Prefer to start a conversation directly?{" "}
            <a
              href={`mailto:${props.supportEmail}`}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {props.supportEmail}
            </a>
          </p>
        </div>
      </AuthShell>
    </>
  );
}
