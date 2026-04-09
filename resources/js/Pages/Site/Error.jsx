import { Head, Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";

export default function Error({
  status = 500,
  message = "An internal server error occurred.",
}) {
  return (
    <>
      <Head title={String(status)} />

      <div className="flex grow items-center justify-center text-center">
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg">
          <h1 className="mb-2 font-mono text-8xl font-bold text-muted-foreground/40">
            {status}
          </h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
            {status >= 500 ? "An internal server error occurred." : message}
          </h2>
          <p className="mb-6 leading-relaxed text-muted-foreground">
            The above error occurred while the Web server was processing your
            request. Please contact us if you think this is a server error.
            Thank you.
          </p>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
