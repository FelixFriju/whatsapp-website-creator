const images: Record<string, string[]> = {
  restaurant: ["/business-images/restaurant/hero.svg"],
  salon: ["/business-images/salon/hero.svg"],
  interior: ["/business-images/interior/hero.svg"],
  construction: ["/business-images/construction/hero.svg"],
  gym: ["/business-images/gym/hero.svg"],
  bakery: ["/business-images/bakery/hero.svg"]
};

export function pickBusinessImage(type: string) {
  const key = type.toLowerCase().replace(/\s+/g, "-");
  return images[key]?.[0] ?? "/business-images/default.svg";
}
