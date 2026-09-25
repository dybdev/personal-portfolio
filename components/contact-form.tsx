"use client";

import { useActionState, useRef, useState } from "react";
import { ArrowRight, Check, CircleCheck, X } from "lucide-react";
import { sendContact } from "@/app/actions/contact";
import { workTypes, type ContactState } from "@/lib/contact";

const initial: ContactState = { status: "idle", message: "" };
const fieldClass = "peer mt-2 min-h-12 w-full rounded-full border border-foreground/20 bg-foreground/5 px-5 py-3 text-base sm:text-sm text-foreground placeholder:text-foreground/50 transition-colors hover:border-foreground/35 focus:border-foreground/60 focus:bg-foreground/10 focus:shadow-[inset_0_-2px_0_var(--page-foreground)] focus:outline-none! focus-visible:outline-none!";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [closed, setClosed] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function validateWork() {
    const boxes = panelRef.current?.querySelectorAll<HTMLInputElement>('input[name="work"]');
    const selected = boxes && Array.from(boxes).some((box) => box.checked);
    boxes?.[0]?.setCustomValidity(selected ? "" : "Choose at least one type of work.");
  }

  return (
    <div className="rounded-[2rem] border border-foreground/25 bg-background p-6 shadow-[inset_0_1px_0_0_var(--color-secondary)] sm:p-9 lg:p-10">
      <div className="mb-8 flex items-start justify-between gap-5">
        <h3 id="contact-form-title" className="max-w-64 text-lg leading-7 font-medium tracking-[-0.025em]">
          Get in touch to find out<br />how we can collaborate.
        </h3>
        <button type="button" aria-label={closed ? "Open contact form" : "Minimize contact form"} aria-expanded={!closed} aria-controls="contact-form-fields" onClick={() => setClosed(!closed)} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10">
          <X aria-hidden="true" className={`size-5 transition-transform ${closed ? "rotate-45" : ""}`} strokeWidth={1.5} />
        </button>
      </div>
      <div inert={!closed} aria-hidden={!closed} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${closed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 overflow-hidden"><button type="button" onClick={() => setClosed(false)} className="min-h-11 text-sm underline underline-offset-4">Start a conversation</button></div>
      </div>
      <div id="contact-form-fields" ref={panelRef} inert={closed} aria-hidden={closed} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${closed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
        <div className="min-h-0 overflow-hidden">
        <form action={action} aria-labelledby="contact-form-title" aria-busy={pending} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="relative block text-xs">
              Your Full Name <span aria-hidden="true">*</span>
              <input name="name" autoComplete="name" required minLength={2} maxLength={100} defaultValue={state.values?.name} placeholder="Your name" className={`${fieldClass} pr-12`} />
              <CircleCheck aria-hidden="true" className="pointer-events-none absolute right-4 bottom-4 size-4 opacity-0 peer-valid:opacity-100" strokeWidth={1.5} />
            </label>
            <label className="block text-xs">
              Your Company <span aria-hidden="true">*</span>
              <input name="company" autoComplete="organization" required minLength={2} maxLength={100} defaultValue={state.values?.company} placeholder="Company or independent" className={fieldClass} />
            </label>
          </div>
          <label className="block text-xs">
            Email Address <span aria-hidden="true">*</span>
            <input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={state.values?.email} placeholder="you@example.com" className={fieldClass} />
          </label>
          <fieldset>
            <legend className="mb-2 text-xs leading-6">
              Type of Work <span aria-hidden="true">*</span>{" "}
              <span className="text-foreground/60">(Pick the areas you’d like to explore with us)</span>
            </legend>
            <div className="grid gap-x-4 sm:grid-cols-2">
              {workTypes.map((work) => (
                <label key={work} className="flex min-h-11 cursor-pointer items-center gap-2.5 text-xs font-medium">
                  <span className="relative flex size-4 shrink-0">
                    <input type="checkbox" name="work" value={work} defaultChecked={state.values?.work.includes(work)} onChange={validateWork} className="peer size-4 appearance-none rounded-[5px] border border-foreground/25 bg-foreground/5 transition-colors duration-200 checked:border-foreground checked:bg-foreground focus-visible:outline-offset-2" />
                    <Check aria-hidden="true" className="pointer-events-none absolute inset-0 size-4 scale-50 p-0.5 text-background opacity-0 transition-[transform,opacity] duration-200 ease-out peer-checked:scale-100 peer-checked:opacity-100" strokeWidth={2} />
                  </span>
                  {work}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block text-xs">
            Tell us all about your project <span aria-hidden="true">*</span>
            <textarea ref={messageRef} name="message" required minLength={20} maxLength={5000} rows={4} defaultValue={state.values?.message} placeholder="Details, deadlines etc." className={`${fieldClass} resize-y rounded-[1.5rem]!`} />
          </label>
          <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="flex flex-wrap items-end justify-between gap-6 pt-1">
            <button
              type="submit"
              disabled={pending}
              onClick={validateWork}
              aria-label={pending ? "Sending message…" : "Submit"}
              className={`group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-wait disabled:opacity-50 motion-reduce:transition-none ${
                pending
                  ? "w-42 border-foreground bg-foreground text-background"
                  : "w-13 border-foreground/20 bg-foreground/10 text-foreground hover:w-38 hover:border-foreground hover:bg-foreground hover:text-background focus-visible:w-38 focus-visible:border-foreground focus-visible:bg-foreground focus-visible:text-background"
              }`}
            >
              <div className="flex items-center justify-center">
                <span
                  className={`overflow-hidden whitespace-nowrap text-sm font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    pending
                      ? "max-w-28 pr-2 opacity-100 translate-x-0"
                      : "max-w-0 pr-0 opacity-0 -translate-x-3 group-hover:max-w-24 group-hover:pr-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:max-w-24 group-focus-visible:pr-2 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                  }`}
                >
                  {pending ? "Sending…" : "Submit"}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none"
                  strokeWidth={1.5}
                />
              </div>
            </button>
            <div className="text-right">
              <p className="mb-2 text-xs text-foreground/60">Not yet sure?</p>
              <button type="button" onClick={() => {
                if (messageRef.current) {
                  if (!messageRef.current.value) messageRef.current.value = "I'd like to book an intro call to discuss a potential project. My availability is: ";
                  messageRef.current.focus();
                }
              }} className="min-h-11 rounded-full border border-foreground/30 px-5 py-2 text-xs font-medium transition-colors hover:bg-foreground/5">Book an intro call</button>
            </div>
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" className="text-xs leading-6 empty:hidden">{state.message}</p>
        </form>
        </div>
      </div>
    </div>
  );
}
