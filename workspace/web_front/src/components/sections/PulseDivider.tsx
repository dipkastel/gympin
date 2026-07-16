import { JSX } from "react";

export default function PulseDivider(): JSX.Element {
  return (
    <div className="blog-pulse" aria-hidden="true">
      <svg viewBox="0 0 400 28" fill="none">
        <path
          d="M0 14 H140 L155 4 L170 24 L185 14 H400"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
