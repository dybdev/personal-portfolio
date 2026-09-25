"use server";

import { parseContact, type ContactState } from "@/lib/contact";

export async function sendContact(_previous: ContactState, data: FormData): Promise<ContactState> {
  const { values, spam, valid } = parseContact(data);
  if (spam) return { status: "error", message: "Unable to submit this message. Please try again.", values };
  if (!valid) return {
    status: "error",
    message: "Please enter your name and company (2–100 characters), a valid email, at least one type of work, and a message (20–5,000 characters).",
    values,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) return {
    status: "error", message: "Email delivery is currently unavailable. Please try again later.", values,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to], reply_to: values.email,
        subject: "New portfolio inquiry",
        text: `Name: ${values.name}\nCompany: ${values.company}\nEmail: ${values.email}\nType of work: ${values.work.join(", ")}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return {
      status: "error", message: "Your message could not be sent. Please try again later.", values,
    };
    return { status: "success", message: "Your message has been sent. Thank you for reaching out." };
  } catch {
    return { status: "error", message: "Your message could not be sent. Please try again later.", values };
  }
}
