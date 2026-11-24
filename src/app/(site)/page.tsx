import type { Metadata } from "next";
import { getSiteData, hasDemoContent } from "@/lib/data/site";
import {
  buildWhatsAppUrl,
  generalWhatsAppMessage,
  roomWhatsAppMessage,
} from "@/lib/whatsapp";
import { Hero } from "@/components/site/hero";
import { ProfileSection } from "@/components/site/profile-section";
import { FacilitiesSection } from "@/components/site/facilities-section";
import { RoomsPreview } from "@/components/site/rooms-preview";
import { GallerySection } from "@/components/site/gallery-section";
import { LocationSection } from "@/components/site/location-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { FaqSection } from "@/components/site/faq-section";
import { CtaSection } from "@/components/site/cta-section";
import { siteUrl } from "@/lib/config";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const ogImage = data.settings.og_image_url ?? data.blocks.hero?.image_url ?? null;

  return {
    alternates: { canonical: "/" },
    openGraph: {
      url: siteUrl,
      images: ogImage
        ? [{ url: ogImage, alt: data.settings.site_name }]
        : undefined,
    },
  };
}

export default async function HomePage() {
  const data = await getSiteData();
  const { settings, rooms, gallery, faqs, testimonials, highlights, facilities } = data;
  const demo = hasDemoContent(data);

  const context = { siteName: settings.site_name, baseMessage: settings.whatsapp_message };
  const generalHref = buildWhatsAppUrl(
    settings.whatsapp_number,
    generalWhatsAppMessage(context),
  );

  const heroBlock = data.blocks.hero;
  const heroImage =
    heroBlock?.image_url ?? gallery[0]?.image_url ?? rooms[0]?.cover_image_url ?? null;

  const profileImage =
    data.blocks.profile?.image_url ?? gallery[1]?.image_url ?? gallery[0]?.image_url ?? null;

  const publishedFaqs = faqs.filter((faq) => faq.is_published);
  const publishedTestimonials = testimonials.filter(
    (testimonial) => testimonial.is_published && !testimonial.is_demo,
  );

  const faqJsonLd =
    publishedFaqs.length > 0 && !publishedFaqs.some((faq) => faq.is_demo)
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: publishedFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const lodgingJsonLd =
    !demo && settings.address_line
      ? {
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: settings.site_name,
          description: settings.seo_description ?? undefined,
          url: siteUrl,
          address: {
            "@type": "PostalAddress",
            streetAddress: settings.address_line,
            addressLocality: settings.city,
            addressRegion: settings.province,
            addressCountry: "ID",
          },
          ...(settings.whatsapp_number
            ? { telephone: `+${settings.whatsapp_number.replace(/^0/, "62")}` }
            : {}),
        }
      : null;

  return (
    <>
      {lodgingJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      ) : null}
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      <Hero
        settings={settings}
        block={heroBlock}
        whatsappHref={generalHref}
        imageUrl={heroImage}
        imageAlt={
          heroBlock?.image_alt ?? (demo ? "Ilustrasi suasana hunian" : "Suasana hunian")
        }
        isDemo={demo}
        rooms={rooms}
      />

      <ProfileSection
        block={data.blocks.profile}
        highlights={highlights}
        imageUrl={profileImage}
        imageAlt={
          data.blocks.profile?.image_alt ??
          (demo ? "Ilustrasi area hunian" : "Area hunian")
        }
        isDemo={demo}
      />

      <FacilitiesSection facilities={facilities} isDemo={facilities.length > 0 && demo} />

      <RoomsPreview
        rooms={rooms}
        buildWhatsAppHref={(roomName) =>
          buildWhatsAppUrl(settings.whatsapp_number, roomWhatsAppMessage(roomName, context))
        }
      />

      <GallerySection items={gallery} isDemo={gallery.some((item) => item.is_demo)} />

      <LocationSection settings={settings} block={data.blocks.location_intro} />

      <TestimonialsSection testimonials={publishedTestimonials} />

      <FaqSection faqs={publishedFaqs} />

      <CtaSection
        block={data.blocks.cta}
        whatsappHref={generalHref}
        siteName={settings.site_name}
      />
    </>
  );
}
