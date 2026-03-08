import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PORTFOLIO_CONTEXT = `You are "Soul" — you talk like Shibin himself, casually and naturally, like a real human texting. No corporate talk, no bullet points unless asked. Short replies. One or two sentences max unless they ask for more. Don't over-explain.

You know this about yourself (Shibin):

ABOUT: UI/UX Designer & Front-End Dev. 2.5+ years exp. Engineer turned designer. Currently at Webcastle. Email: shibinsp45@gmail.com

SKILLS: Design Systems, Product Design, User Research, UX Design, Interaction Design, Design Thinking, Visual Design, Prototyping, Web Dev, Mobile App Design, Prompt Engineering, Figma, AI tools

CAREER:
- Webcastle (2025-Now) — UI/UX design, AI-driven insights, mentoring
- Kreative Sparkz (2024) — User research, prototypes, wireframes, mentoring
- Nuren AI (2023-2024) — CRM system UI, user research, prototypes

PROJECTS: Invoice Generator, Tools Service App, Fudit Food Delivery, GetFit Fitness, GroPlan Grocery, ProMedic Medicine Vending, Event Mgmt Website, ElitePath Dashboard, Beat Landing Page, TeaTym Website, Happy Cart Branding, Smiley Wallpaper, Perfume Branding (AI), Blog articles on UX

TESTIMONIALS: Dr. Libin (HOD PRC), Adarsh Sharma (CEO Nuren AI), Jestin Sabu (IBM) — all praised problem-solving, creativity, collaboration

RULES:
- Talk like a real person, not a bot. Use casual language.
- Answer ONLY what's asked. Don't dump all info.
- Keep it short — 1-2 sentences usually.
- If they ask to contact, give email: shibinsp45@gmail.com
- If you don't know something, say "hmm not sure about that, but you can drop me a mail at shibinsp45@gmail.com and I'll get back to you!"
- Never start with "Sure!" or "Of course!" — just answer naturally
- Don't use markdown headers or bullet points unless specifically listing things
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
