// Local monochrome brand marks; no additional icon library is needed.
export function SocialIcon({ label }: { label: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
      {label === "GitHub" && <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.4c0-1 .1-1.4-.5-2 3.3-.4 6.7-1.6 6.7-7.3 0-1.6-.5-2.8-1.5-3.8.2-.4.6-1.9-.2-3.8 0 0-1.2-.4-4 1.5a14 14 0 0 0-7 0c-2.8-1.9-4-1.5-4-1.5-.8 1.9-.4 3.4-.2 3.8-1 1-1.5 2.2-1.5 3.8 0 5.7 3.4 6.9 6.7 7.3-.5.5-.5 1.1-.5 2V22" />}
      {label === "LinkedIn" && <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7" cy="7" r=".7" fill="currentColor" /></>}
      {label === "Instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" /></>}
    </svg>
  );
}
