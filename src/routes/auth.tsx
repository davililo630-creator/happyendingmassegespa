import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Sign In | Happy Ending Massage Spa" },
      { name: "description", content: "Private staff sign in for Happy Ending Massage Spa booking management." },
      { property: "og:title", content: "Staff Sign In | Happy Ending Massage Spa" },
      { property: "og:description", content: "Private staff area." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!email || password.length < 6) {
      toast.error("Enter an email and a password of at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. Ask the spa owner to grant admin access.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[90svh] max-w-md flex-col justify-center px-4 pt-28 pb-16">
      <img src={logo} alt="Happy Ending Massage Spa logo" width={120} height={120} className="mx-auto h-20 w-20 object-contain" />
      <h1 className="mt-6 text-center font-display text-3xl">Staff Sign In</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Private booking management for spa staff only.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-xl border border-border bg-card p-6 shadow-card">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 h-14 w-full rounded-lg border border-input bg-onyx/60 px-4 text-base outline-none focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="mt-2 h-14 w-full rounded-lg border border-input bg-onyx/60 px-4 text-base outline-none focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="h-14 w-full rounded-full bg-primary text-sm uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
        >
          {mode === "signin" ? "Create a staff account" : "I already have an account"}
        </button>
      </form>
    </section>
  );
}
