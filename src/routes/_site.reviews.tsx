import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, ReviewCard, CtaBand } from "@/components/site/blocks";
import { useReviews } from "@/lib/cms";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/_site/reviews")({
  head: () => seo("Customer Reviews | NR Waterproofing Services Kurnool",
    "Read what customers in Kurnool say about our waterproofing and leakage treatment work."),
  component: Page,
});

function Page() {
  const reviews = useReviews();
  return (
    <>
      <PageHero eyebrow="Reviews" title="Our Work Speaks Through Our Customers." />
      <Section><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div></Section>
      <CtaBand />
    </>
  );
}
