export const SECTION_NAV_EVENT = "section-nav";

/** Smooth-scroll to a section and let About temporarily release its scroll lock. */
export function scrollToSection(id: string) {
  window.dispatchEvent(
    new CustomEvent(SECTION_NAV_EVENT, { detail: { id } }),
  );
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}
