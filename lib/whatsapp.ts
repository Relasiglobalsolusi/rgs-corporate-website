import type { CmsContent } from "@/lib/cms";

/**
 * RGS's two WhatsApp numbers, both set in RGS ONE → Company Details: business
 * inquiries (clients) and career inquiries (job seekers). A number left empty
 * there is null here, and every WhatsApp button and line for it stays hidden.
 */
export type WhatsappNumbers = { inquiries: string | null; recruitment: string | null };

export function whatsappNumbers(contact: CmsContent["contact"]): WhatsappNumbers {
  return {
    inquiries: contact.whatsappInquiries?.trim() || null,
    recruitment: contact.whatsappRecruitment?.trim() || null,
  };
}

/** wa.me link for a number as people write it ("+62 851-…" or "0851-…"). */
export function whatsappHref(number: string, message: string): string {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `62${digits.slice(1)}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
