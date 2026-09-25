export const workTypes = ["Product Design", "Branding", "UI/UX", "Motion Design", "Illustration/Graphics", "Development", "Other / Not yet sure"] as const;

export type ContactState = {
  status: "idle" | "error" | "success";
  message: string;
  values?: { name: string; company: string; email: string; message: string; work: string[] };
};

export function parseContact(data: FormData) {
  const read = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const work = data.getAll("work").filter((value): value is string => typeof value === "string");
  const values = { name: read("name"), company: read("company"), email: read("email"), message: read("message"), work };
  const spam = Boolean(read("website"));
  const valid = values.name.length >= 2 && values.name.length <= 100
    && values.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    && !/[\r\n]/.test(values.name)
    && values.company.length >= 2 && values.company.length <= 100 && !/[\r\n]/.test(values.company)
    && work.length > 0 && work.length <= workTypes.length
    && work.every((item) => workTypes.some((option) => option === item))
    && values.message.length >= 20 && values.message.length <= 5000;
  return { values, spam, valid };
}
