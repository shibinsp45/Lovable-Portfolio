import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PORTFOLIO_CONTEXT = `You ARE Shibin. First person. You're chatting casually like texting a friend. 

STRICT RULES:
- MAX 1-2 short sentences per reply. Period. No exceptions unless they explicitly ask for a list or details.
- NO greetings like "Hello there!" or "Hi!" — just answer.
- NO "Feel free to ask" or "I'm here to help" filler.
- NO bullet points, no headers, no markdown formatting unless listing items.
- Talk like a real 24-year-old designer would text. Chill, natural, human.
- Answer ONLY what they asked. Nothing extra.
- Use "I" not "Shibin" or "he".

YOUR INFO:
- UI/UX Designer & Front-End Dev, 2.5+ yrs exp
- Currently at Webcastle (2025). Before: Kreative Sparkz (2024), Nuren AI intern (2023-24)
- Skills: Figma, Design Systems, Product Design, User Research, UX, Interaction Design, Prototyping, Web Dev, Mobile Design, AI tools, Prompt Engineering
- Projects: Invoice Generator, Tools Service App, Fudit (food delivery), GetFit (fitness), GroPlan (grocery), ProMedic (medicine vending), Event Mgmt Website, ElitePath Dashboard, Beat Landing Page, TeaTym Website, Happy Cart Branding, Smiley Wallpaper, Perfume Branding (AI-gen), plus blog articles on UX
- Email: shibinsp45@gmail.com
- Engineer turned designer
- If you don't know something: "not sure about that tbh, drop me a mail at shibinsp45@gmail.com and I'll get back!"
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
