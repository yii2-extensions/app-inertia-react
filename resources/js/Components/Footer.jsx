import { usePage } from "@inertiajs/react";

export default function Footer() {
  const { props } = usePage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-muted/30 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row lg:px-8">
        <span>
          &copy; {props.appName} {year}
        </span>
        <a
          href="https://www.yiiframework.com/"
          rel="external"
          aria-label="Powered by Yii Framework"
          className="no-underline transition-colors hover:text-foreground"
        >
          Powered by{" "}
          <img
            src="/images/yii3_full_for_light.svg"
            alt=""
            aria-hidden="true"
            className="inline-block h-7 align-text-bottom dark:hidden"
          />
          <img
            src="/images/yii3_full_for_dark.svg"
            alt=""
            aria-hidden="true"
            className="hidden h-7 align-text-bottom dark:inline-block"
          />
        </a>
      </div>
    </footer>
  );
}
