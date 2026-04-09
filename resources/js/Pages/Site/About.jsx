import { Head, Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";

export default function About() {
  return (
    <>
      <Head title="About" />

      <div className="flex grow items-center justify-center text-center">
        <div className="mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            This is the About page.
          </h1>

          <p className="mb-6 leading-relaxed text-muted-foreground">
            You may modify the following file to customize its content:
            <code className="mt-2 block font-mono text-sm text-primary">
              resources/js/Pages/Site/About.jsx
            </code>
          </p>

          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
