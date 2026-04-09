# Usage examples

## Creating a new page

### 1. Add a controller action

```php
public function actionDashboard(): \yii\web\Response
{
    return $this->inertia('Dashboard', ['stats' => $this->getStats()]);
}
```

### 2. Create the React component

Create `resources/js/Pages/Dashboard.jsx`:

```jsx
import { Head } from "@inertiajs/react";

export default function Dashboard({ stats = {} }) {
  return (
    <>
      <Head title="Dashboard" />
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>
    </>
  );
}
```

The page automatically uses the `Layout` component configured in `resources/js/app.jsx`.

## Form submission with validation

Inertia handles form state and server-side validation errors:

```jsx
import { useForm } from "@inertiajs/react";

export default function MyForm() {
  const form = useForm({
    "MyModel[name]": "",
    "MyModel[email]": "",
  });

  const submit = (e) => {
    e.preventDefault();
    form.post("/my-controller/action", { preserveScroll: true });
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={form.data["MyModel[name]"]}
        onChange={(e) => form.setData("MyModel[name]", e.target.value)}
      />
      {form.errors["name"] && (
        <p className="text-red-500 text-sm">{form.errors["name"]}</p>
      )}
      <button type="submit" disabled={form.processing}>
        Submit
      </button>
    </form>
  );
}
```

## Accessing shared props

Shared props are defined in `config/web.php` under the `inertia` component. Access them in any React component:

```jsx
import { usePage } from "@inertiajs/react";

export default function Example() {
  const page = usePage();
  const user = page.props.auth?.user;
  const turnstileKey = page.props.turnstileSiteKey;

  return null;
}
```

Available shared props: `auth`, `flash`, `turnstileSiteKey`.

## Using shadcn/ui components

Import components from the local `@/Components/ui` directory (shadcn/ui conventions, built on top of Radix UI primitives):

```jsx
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Badge } from "@/Components/ui/badge";

export default function Example() {
  return (
    <>
      <Alert>
        <AlertDescription>Operation completed.</AlertDescription>
      </Alert>
      <Badge variant="default">Active</Badge>
    </>
  );
}
```

## Internal navigation

Use Inertia's `<Link>` component instead of `<a>` for internal navigation:

```jsx
import { Link } from "@inertiajs/react";

export default function Nav() {
  return (
    <>
      <Link href="/site/about" className="text-primary-600">
        About
      </Link>
      <Link href="/user/logout" method="post" as="button">
        Logout
      </Link>
    </>
  );
}
```

## Next steps

- 📚 [Installation Guide](installation.md)
- ⚙️ [Configuration Guide](configuration.md)
- 🧪 [Testing Guide](testing.md)
