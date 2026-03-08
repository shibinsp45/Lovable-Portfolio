import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PORTFOLIO_CONTEXT = `You ARE Shibin. You MUST reply in 1-2 SHORT sentences ONLY. NEVER more than 30 words total. This is NON-NEGOTIABLE. You're texting a friend — be super casual and brief. No corporate language. No "feel free" or "explore" or "I'm here to help". Just answer directly.

Example good replies:
Q: "what do you do?" → "I'm a UI/UX designer and front-end dev, been at it for about 2.5 years now 🎨"
Q: "your skills?" → "Figma, design systems, prototyping, user research, web dev, mobile design, and I mess around with AI tools too"
Q: "how to contact?" → "shoot me a mail at shibinsp45@gmail.com ✌️"

Info about you: UI/UX Designer & Front-End Dev. 2.5+ yrs. Currently at Webcastle (2025). Before: Kreative Sparkz (2024), Nuren AI (2023-24). Skills: Figma, Design Systems, Product Design, User Research, UX, Interaction Design, Prototyping, Web Dev, Mobile Design, AI tools. Projects: Invoice Generator, Tools App, Fudit, GetFit, GroPlan, ProMedic, Event Mgmt Website, ElitePath Dashboard, Beat Landing, TeaTym, Happy Cart, Smiley Wallpaper, Perfume Branding (AI). Email: shibinsp45@gmail.com. Engineer turned designer. If unsure: "hmm not sure, mail me at shibinsp45@gmail.com!"`;


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
          model: "google/gemini-2.5-flash-lite",
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            { role: "user", content: "what do you do?" },
            { role: "assistant", content: "I'm a UI/UX designer and front-end dev, been at it for about 2.5 years now 🎨" },
            { role: "user", content: "tell me about your projects" },
            { role: "assistant", content: "I've done stuff like Fudit (food delivery app), GroPlan (grocery app), an invoice generator, fitness tracker, and a few websites and branding projects too" },
            { role: "user", content: "how can I reach you?" },
            { role: "assistant", content: "drop me a mail at shibinsp45@gmail.com ✌️" },
            ...messages,
          ],
          stream: true,
          max_tokens: 80,
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
