/** Shared tel: / maps: helpers for contact chrome. */

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function mapsHref(addressLines: string[]) {
  const query = encodeURIComponent(addressLines.join(" "));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
