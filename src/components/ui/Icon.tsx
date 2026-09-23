import type { IconName } from "@/config/categories";

const paths: Record<IconName, string> = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  percent: "M19 5 5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6M9 12h6M9 16h3",
  file: "M14 3H6v18h12V7l-4-4Zm0 0v4h4M9 12h6M9 16h6",
  invoice: "M5 4h14v16H5zM8 8h8M8 12h4m2 4h2",
  tag: "M3 12V4h8l9 9-8 8-9-9Zm4.5-4.5h.01",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm0 14a2 2 0 0 1 2-2h13",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4m8-4v4",
  calculator: "M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01",
  guide: "M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5m0-14.5c2-1.5 5-2 8-1.5V19c-3-.5-6 0-8 1.5m0-14.5v14.5",
  search: "m20 20-4.5-4.5M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
  check: "m5 12 5 5 9-10",
  alert: "M12 8v5m0 3h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  external: "M14 4h6v6m0-6-9 9M18 14v6H4V6h6",
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
