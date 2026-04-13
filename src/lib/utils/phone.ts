export function normalizePhone(phone: string) {
  if (!phone) return "";

  if (phone.startsWith("+")) return phone;

  if (phone.startsWith("0")) {
    return `+20${phone.slice(1)}`;
  }

  return `+20${phone}`;
}
