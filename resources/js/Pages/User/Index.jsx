import { useEffect, useRef, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

const STATUS_ACTIVE = 10;
const STATUS_INACTIVE = 9;
const STATUS_DELETED = 0;

const STATUS_BADGE = {
  [STATUS_ACTIVE]: {
    label: "Active",
    className: "bg-success/15 text-success border border-success/30",
  },
  [STATUS_INACTIVE]: {
    label: "Inactive",
    className:
      "bg-amber-500/15 text-amber-600 border border-amber-500/30 dark:text-amber-400",
  },
  [STATUS_DELETED]: {
    label: "Deleted",
    className:
      "bg-destructive/15 text-destructive border border-destructive/30",
  },
};

const USER_INDEX_ROUTE = "/user/index";
const SORT_ORDER_ASC = 4;
const SORT_ORDER_DESC = 3;

const sortParamFromAttributes = (attributes = {}) => {
  const [entry] = Object.entries(attributes);

  if (!entry) return "";

  return entry[1] === SORT_ORDER_DESC ? `-${entry[0]}` : entry[0];
};

const ariaSort = (attributes, attribute) => {
  const order = attributes?.[attribute];

  if (order === SORT_ORDER_ASC) return "ascending";
  if (order === SORT_ORDER_DESC) return "descending";

  return "none";
};

const sortIcon = (attributes, attribute) => {
  const order = attributes?.[attribute];

  if (order === SORT_ORDER_ASC) return " \u25B2";
  if (order === SORT_ORDER_DESC) return " \u25BC";

  return "";
};

const formatDate = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${date.getFullYear()}`;
};

const buildSearchParams = ({ username, email, status, sort }) => {
  const params = {};

  if (username) params["UserSearch[username]"] = username;
  if (email) params["UserSearch[email]"] = email;
  if (status !== "" && status !== null && status !== undefined) {
    params["UserSearch[status]"] = status;
  }
  if (sort) params.sort = sort;

  return params;
};

export default function Index({
  users = [],
  pagination = { totalCount: 0, pageSize: 10, currentPage: 1, pageCount: 1 },
  sort = { attributes: {} },
  filters = { username: "", email: "", status: "" },
}) {
  const [filterUsername, setFilterUsername] = useState(filters.username || "");
  const [filterEmail, setFilterEmail] = useState(filters.email || "");
  const [filterStatus, setFilterStatus] = useState(filters.status ?? "");
  const [sortParam, setSortParam] = useState(
    sortParamFromAttributes(sort.attributes),
  );

  const debounceRef = useRef(null);
  const skipDebounceRef = useRef(true);

  useEffect(() => {
    setSortParam(sortParamFromAttributes(sort.attributes));
  }, [sort.attributes]);

  useEffect(() => {
    if (skipDebounceRef.current) {
      skipDebounceRef.current = false;
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      router.get(
        USER_INDEX_ROUTE,
        buildSearchParams({
          username: filterUsername,
          email: filterEmail,
          status: filterStatus,
          sort: sortParam,
        }),
        { preserveState: true, preserveScroll: true, replace: true },
      );
      debounceRef.current = null;
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [filterUsername, filterEmail, filterStatus]);

  const sortBy = (attribute) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const next = sortParam === attribute ? `-${attribute}` : attribute;
    setSortParam(next);

    router.get(
      USER_INDEX_ROUTE,
      buildSearchParams({
        username: filterUsername,
        email: filterEmail,
        status: filterStatus,
        sort: next,
      }),
      { preserveState: true, preserveScroll: true },
    );
  };

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > pagination.pageCount ||
      page === pagination.currentPage
    ) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    router.get(
      USER_INDEX_ROUTE,
      {
        ...buildSearchParams({
          username: filterUsername,
          email: filterEmail,
          status: filterStatus,
          sort: sortParam,
        }),
        page,
      },
      { preserveState: true, preserveScroll: true },
    );
  };

  const sortHeader = (attribute, label) => (
    <th
      scope="col"
      aria-sort={ariaSort(sort.attributes, attribute)}
      className="px-4 py-3 text-left"
    >
      <button
        type="button"
        onClick={() => sortBy(attribute)}
        className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-muted-foreground hover:text-foreground"
      >
        {label}
        {sortIcon(sort.attributes, attribute)}
      </button>
    </th>
  );

  const showingFrom = (pagination.currentPage - 1) * pagination.pageSize + 1;
  const showingTo = Math.min(
    pagination.currentPage * pagination.pageSize,
    pagination.totalCount,
  );

  return (
    <>
      <Head title="Users" />

      <div className="flex grow items-center justify-center">
        <Card className="w-full max-w-[1000px] overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <aside className="hero-banner hidden text-white md:flex md:w-1/3">
              <div className="relative flex w-full flex-col justify-between p-5 lg:p-6">
                <img
                  src="/images/yii3_full_white_for_dark.svg"
                  alt="Yii Framework"
                  className="mb-6"
                  height={36}
                />
                <div>
                  <h1 className="mb-3 text-[1.75rem] font-bold leading-tight">
                    User
                    <br />
                    Directory
                  </h1>
                  <p className="text-[0.9rem] opacity-75">
                    Browse, filter, and sort registered users. Use the search
                    fields to find specific accounts.
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                    {pagination.totalCount}{" "}
                    {pagination.totalCount === 1 ? "user" : "users"}
                  </span>
                </div>
              </div>
            </aside>

            <div className="w-full md:w-2/3">
              <div className="p-4 lg:p-5">
                <div className="mb-4 text-center md:hidden">
                  <h1 className="text-xl font-bold text-foreground">Users</h1>
                  <p className="text-sm text-muted-foreground">
                    Browse and filter registered users
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                      <tr>
                        {sortHeader("username", "Username")}
                        {sortHeader("email", "Email")}
                        {sortHeader("status", "Status")}
                        {sortHeader("created_at", "Joined")}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="bg-muted/30">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={filterUsername}
                            onChange={(event) =>
                              setFilterUsername(event.target.value)
                            }
                            aria-label="Filter users by username"
                            placeholder="Filter..."
                            className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={filterEmail}
                            onChange={(event) =>
                              setFilterEmail(event.target.value)
                            }
                            aria-label="Filter users by email"
                            placeholder="Filter..."
                            className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            value={filterStatus}
                            onChange={(event) =>
                              setFilterStatus(event.target.value)
                            }
                            aria-label="Filter users by status"
                            className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                          >
                            <option value="">All</option>
                            <option value={STATUS_ACTIVE}>Active</option>
                            <option value={STATUS_INACTIVE}>Inactive</option>
                            <option value={STATUS_DELETED}>Deleted</option>
                          </select>
                        </td>
                        <td className="px-4 py-2" />
                      </tr>

                      {users.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-4 py-10 text-center text-muted-foreground"
                          >
                            No results found.
                          </td>
                        </tr>
                      )}

                      {users.map((user) => {
                        const status = STATUS_BADGE[user.status] ?? {
                          label: "Unknown",
                          className:
                            "bg-muted text-muted-foreground border border-border",
                        };

                        return (
                          <tr key={user.id} className="hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium text-foreground">
                              {user.username}
                            </td>
                            <td className="px-4 py-3">
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:underline"
                              >
                                {user.email}
                              </a>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                  status.className,
                                )}
                              >
                                {status.label}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                              {formatDate(user.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {users.length > 0 && (
                    <div className="mt-2 text-right text-xs text-muted-foreground">
                      Showing {showingFrom}-{showingTo} of{" "}
                      {pagination.totalCount}{" "}
                      {pagination.totalCount === 1 ? "item" : "items"}.
                    </div>
                  )}
                </div>

                {pagination.pageCount > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.currentPage - 1)}
                      disabled={pagination.currentPage <= 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="size-4" />
                      Prev
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {pagination.currentPage} of {pagination.pageCount}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(pagination.currentPage + 1)}
                      disabled={pagination.currentPage >= pagination.pageCount}
                      aria-label="Next page"
                    >
                      Next
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
