/**
 * Central business settings. In the next phase these come from the `settings` table
 * (editable at /admin/settings). Phone/WhatsApp/email below are PLACEHOLDERS.
 */
export const site = {
  name: "NR Waterproofing Services",
  shortName: "NR Waterproofing",
  tagline: "Professional Waterproofing & Leakage Treatment Services in Kurnool",
  brandMessage:
    "We don't just cover the surface. We identify the problem and select the appropriate waterproofing solution for the site condition.",
  city: "Kurnool",
  region: "Andhra Pradesh",
  address: "Kurnool, Andhra Pradesh, India",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "919000000000",
  email: "info@nrwaterproofing.in",
  social: { facebook: "#", instagram: "#", youtube: "#" },
};

export const whatsappLink = (text = "Hello NR Waterproofing, I need a leakage inspection.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
