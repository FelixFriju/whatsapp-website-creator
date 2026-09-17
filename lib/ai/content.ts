import type { WebsiteContent } from "@/types/website";

console.log("✅ CURRENT CONTENT FILE IS RUNNING");

const fallback = (
  companyName: string,
  businessType: string,
): WebsiteContent => ({
  heroTitle: `${companyName}, made for what matters.`,
  heroDescription: `${companyName} is a trusted ${businessType.toLowerCase()} business focused on quality and a better experience for every customer.`,
  aboutTitle: `Built around your needs`,
  aboutDescription:
    `We combine practical expertise, attention to detail and dependable service to help customers get results they can feel good about.`,
  servicesTitle: `What we offer`,
  services: [
    "Professional service",
    "Personal attention",
    "Reliable results",
    "Premium solution",
    "Specialist service",
    "Custom solution",
  ],
  contactTitle: `Let's talk about your requirement`,
  ctaText: `Get in touch`,
});

type AIResponse = {
  heroTitle?: unknown;
  heroDescription?: unknown;
  aboutTitle?: unknown;
  aboutDescription?: unknown;
  servicesTitle?: unknown;
  services?: unknown;
  contactTitle?: unknown;
  ctaText?: unknown;
};

export async function generateContent(input: {
  companyName: string;
  businessType: string;
}): Promise<WebsiteContent> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.warn("OPENROUTER_API_KEY is missing. Using fallback content.");
    return fallback(input.companyName, input.businessType);
  }

  try {
    const response = await fetch(
      "http://localhost:20128/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "ag/gemini-3-flash",
          temperature: 0.7,
          stream: false,
          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content: `
You are a professional business website copywriter.

Your job is to create website content specifically for the business subject provided by the user.

The business subject is the MOST IMPORTANT input.

The six items in "services" will appear on the website as PRODUCT CARDS.
Therefore, generate specific, recognizable product or service names that a real customer would understand.

Examples:

Business subject: Food
Good product names:
- Fish Curry Masala
- Chicken Biryani Masala
- Kerala Sambar Powder
- Garam Masala
- Black Pepper Powder
- Turmeric Powder

Business subject: Hiking
Good product/service names:
- Guided Mountain Hikes
- Sunrise Trail Adventures
- Weekend Trekking Trips
- Forest Hiking Tours
- Beginner Hiking Experiences
- Private Hiking Expeditions

Business subject: Bakery
Good product names:
- Custom Birthday Cakes
- Fresh Sourdough Bread
- Chocolate Brownies
- Butter Croissants
- Celebration Cupcakes
- Custom Dessert Boxes

Never use generic names such as:
- Professional Service
- Personal Attention
- Reliable Results
- Premium Solution
- Specialist Service
- Custom Solution

unless they are genuinely appropriate for the business.

Return ONLY valid JSON using this exact structure:

{
  "heroTitle": "string",
  "heroDescription": "string",
  "aboutTitle": "string",
  "aboutDescription": "string",
  "servicesTitle": "string",
  "services": [
    "string",
    "string",
    "string",
    "string",
    "string",
    "string"
  ],
  "contactTitle": "string",
  "ctaText": "string"
}

Rules:

1. Generate exactly 6 services/products.
2. Every service/product must directly match the business subject.
3. Product names must be specific and meaningful.
4. Hero content must clearly communicate what the business does.
5. About content must be relevant to the business subject.
6. Services/products must be realistic for the business subject.
7. Do not invent awards, certifications, years of experience, statistics, customers, prices, guarantees or achievements.
8. Use the company name naturally.
9. Do not mention AI.
10. Keep the writing professional and suitable for a real commercial website.
`,
            },
            {
              role: "user",
              content: `
Company name: ${input.companyName}

Business type / subject: ${input.businessType}

Generate the complete website content now.

Most importantly, make all 6 product/service names specifically relevant to:
${input.businessType}
`,
            },
          ],
        }),
      },
    );

    const responseText = await response.text();

    console.log("OPENROUTER STATUS:", response.status);
    console.log("OPENROUTER RESPONSE:", responseText);

    if (!response.ok) {
      console.error("OpenRouter request failed.");
      return fallback(input.companyName, input.businessType);
    }

    const result = JSON.parse(responseText) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const raw = result.choices?.[0]?.message?.content?.trim();

    if (!raw) {
      console.warn("OpenRouter returned empty content.");
      return fallback(input.companyName, input.businessType);
    }

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned) as AIResponse;

    const services = Array.isArray(parsed.services)
      ? parsed.services
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
      console.log("AI PARSED RESULT:", parsed);
      console.log("AI SERVICES:", services);

    if (
      typeof parsed.heroTitle !== "string" ||
      typeof parsed.heroDescription !== "string" ||
      typeof parsed.aboutTitle !== "string" ||
      typeof parsed.aboutDescription !== "string" ||
      typeof parsed.servicesTitle !== "string" ||
      typeof parsed.contactTitle !== "string" ||
      typeof parsed.ctaText !== "string"
    ) {
      console.warn("AI returned invalid text fields.");
      return fallback(input.companyName, input.businessType);
    }

    if (services.length < 6) {
      console.warn(
        "AI returned fewer than 6 services:",
        services.length,
      );
      return fallback(input.companyName, input.businessType);
    }

    return {
      heroTitle: parsed.heroTitle.trim(),
      heroDescription: parsed.heroDescription.trim(),
      aboutTitle: parsed.aboutTitle.trim(),
      aboutDescription: parsed.aboutDescription.trim(),
      servicesTitle: parsed.servicesTitle.trim(),
      services: services.slice(0, 6),
      contactTitle: parsed.contactTitle.trim(),
      ctaText: parsed.ctaText.trim(),
    };
  } catch (error) {
    console.error("AI content generation failed:", error);

    return fallback(input.companyName, input.businessType);
  }
}