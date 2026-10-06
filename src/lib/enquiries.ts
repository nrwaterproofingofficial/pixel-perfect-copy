/**
 * Single enquiry pipeline. Every public form calls `submitEnquiry` with a `source`.
 * V1: no storage (intentionally — no LocalStorage). Next phase: replace the body with a
 * server function that inserts into the `enquiries` table and uploads files to storage.
 */
export type EnquiryStatus = "New" | "Contacted" | "Inspection Scheduled" | "Estimate Sent" | "Converted" | "Closed";
export type EnquirySource =
  | "Contact" | "Free Inspection" | "Terrace Inspection" | "Bathroom Inspection"
  | "Commercial Enquiry" | "Service Enquiry" | "Quote Request";

export type EnquiryInput = {
  name: string; phone: string; location: string; propertyType: string;
  leakageArea: string; service: string; message: string; files: File[]; source: EnquirySource;
};

export type Enquiry = Omit<EnquiryInput, "files"> & {
  id: string; date: string; status: EnquiryStatus; notes: string; media: number;
};

export async function submitEnquiry(input: EnquiryInput): Promise<{ ok: true }> {
  // TODO(backend): persist to `enquiries` + upload `input.files`.
  await new Promise((r) => setTimeout(r, 600));
  void input;
  return { ok: true };
}

export const enquiryStatuses: EnquiryStatus[] = ["New", "Contacted", "Inspection Scheduled", "Estimate Sent", "Converted", "Closed"];

export const sampleEnquiries: Enquiry[] = [
  { id: "e1", name: "Ravi Kumar", phone: "98xxxxxx01", location: "Kurnool", propertyType: "Independent House", leakageArea: "Terrace", service: "Terrace Waterproofing", message: "Ceiling leaking in bedroom.", source: "Free Inspection", date: "2026-10-05", status: "New", notes: "", media: 3 },
  { id: "e2", name: "Lakshmi Devi", phone: "98xxxxxx02", location: "Kurnool", propertyType: "Apartment", leakageArea: "Bathroom", service: "Bathroom Waterproofing", message: "Leak into flat below.", source: "Bathroom Inspection", date: "2026-10-04", status: "Contacted", notes: "Call back Thursday", media: 2 },
  { id: "e3", name: "Suresh Reddy", phone: "98xxxxxx03", location: "Kurnool", propertyType: "Commercial", leakageArea: "Roof", service: "Commercial Waterproofing", message: "Large roof, need quote.", source: "Quote Request", date: "2026-10-02", status: "Inspection Scheduled", notes: "", media: 0 },
  { id: "e4", name: "Anitha", phone: "98xxxxxx04", location: "Kurnool", propertyType: "Independent House", leakageArea: "Water Tank", service: "Water Tank Waterproofing", message: "Sump leaking.", source: "Contact", date: "2026-09-29", status: "Estimate Sent", notes: "", media: 1 },
  { id: "e5", name: "Mahesh", phone: "98xxxxxx05", location: "Kurnool", propertyType: "Apartment", leakageArea: "Wall", service: "Damp Wall Treatment", message: "Damp wall, paint peeling.", source: "Service Enquiry", date: "2026-09-25", status: "Converted", notes: "", media: 4 },
  { id: "e6", name: "Prasad", phone: "98xxxxxx06", location: "Kurnool", propertyType: "Independent House", leakageArea: "Balcony", service: "Balcony Waterproofing", message: "", source: "Free Inspection", date: "2026-09-20", status: "Closed", notes: "Not reachable", media: 0 },
];
