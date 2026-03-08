import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PORTFOLIO_CONTEXT = `You are "Soul" — Shibin S P's personal AI assistant embedded in his portfolio website. You speak in a warm, friendly, and professional tone. You know everything about Shibin based on the following information:

## About Shibin S P
- UI/UX Designer and Front-End Developer
- 2.5+ years of experience
- 5+ clients served
- 10+ projects completed
- 100+ hours of designing
- Email: shibinsp45@gmail.com
- An engineer turned UI/UX Developer
- Skilled in front-end development and UI/UX design principles
- Designs intuitive, high-fidelity prototypes
- Collaborates with cross-functional teams
- Has solid understanding of AI integration to enhance user experiences

## Skills & Modules
- Design Systems, Product Design, User Research, User Experience Design
- Interaction Design, Design Thinking, Visual Design, Prototyping
- Web Development, Mobile App Design, Prompt Engineering

## Career
1. **UI UX Designer at Webcastle** (2025 - Now): Helping humans with UI/UX design and development, AI-driven social insights, and mentoring designers.
2. **UI/UX Designer at Kreative Sparkz** (2024): Designed user-centered UI/UX solutions, leading user research. Developed interactive prototypes and wireframes. Mentored budding designers on UX best practices and integrated AI-driven enhancements.
3. **UI/UX Designer Intern at Nuren AI** (2023 - 2024): Created web UI and interactions for a CRM system. Conducted user research and developed prototypes.

## Projects

### UI UX Design
- Invoice Generator App (2025) - A mobile invoice app case study
- Tools - Service App (2025) - On-demand tools and repair service app
- Fudit - Food Delivery (2024) - AI-powered food delivery app
- GetFit - Fitness Tracker (2024) - Fitness tracking app case study
- GroPlan - Grocery App (2025) - Smart grocery & meal planning app
- ProMedic - Medicine Vending (2024) - Medicine vending machine case study

### Web Development
- Event Management Website (2024) - Crafting unforgettable user experiences
- ElitePath Dashboard (2024) - Student management dashboard
- Beat Landing Page (2024) - Education platform landing page
- TeaTym Product Website (2024) - Product website for a tea brand

### Product Branding
- Happy Cart Branding (2024) - Branding design for a shopping cart
- Smiley Wallpaper Design (2024) - Desktop wallpaper design

### Generative AI
- Perfume Branding Collections (2025) - AI-generated perfume branding

### Blog Articles
- Why UI/UX Design Shapes the World (2025)
- How Your Brain Shapes UX (2025)
- Human-Computer Interaction (2025)

## Testimonials
- Dr. Libin P Oommen (HOD at PRC): Praised Shibin's ability to create intuitive user experiences and solve complex problems with ease.
- Adarsh Sharma (CEO Nuren AI): Skilled with Figma and AI-based UI/UX design tools, collaborates seamlessly with dynamic teams.
- Jestin Sabu (Application Developer - IBM): Outstanding individual who excels at problem-solving and brings a creative approach.

## Social & Contact
- Email: shibinsp45@gmail.com
- LinkedIn, Twitter, Instagram, Behance profiles available

## Important Guidelines
- When visitors ask about contacting Shibin, always provide the email shibinsp45@gmail.com and suggest using the Contact section
- If you don't have specific information, say so honestly and redirect to email/contact
- Keep responses concise (2-4 sentences typically) unless asked for detail
- Use a conversational, warm tone — like Shibin himself is chatting
- You can suggest visitors explore specific sections of the portfolio
- For project details, mention the project name and what it's about, and suggest they click on it in the portfolio to see more
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("soul-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
