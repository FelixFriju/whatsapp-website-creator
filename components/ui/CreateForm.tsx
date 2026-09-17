"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";



export default function CreateForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError("");

  const body = Object.fromEntries(new FormData(e.currentTarget));

  try {
    const res = await fetch("/api/websites", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push(`/${data.slug}`);
  } catch {
    setError("Could not connect to the server. Please try again.");
    setLoading(false);
  }
}

  return (
    <form className="form-card" onSubmit={submit}>
      <h2>Tell us about your business</h2>
      <p className="muted">Only the essentials. We handle the presentation.</p>

      {error && <div className="status">{error}</div>}

      <div className="field">
        <label>Business name</label>
        <input name="companyName" required placeholder="ABC Interiors" />
      </div>

      <div className="field">
        <label>Business type / subject</label>
        <input name="businessType" required placeholder="Interior design" />
      </div>

      <div className="field">
        <label>Phone number</label>
        <input name="phone" required placeholder="+91 98765 43210" />
      </div>

      <div className="field">
        <label>Email</label>
        <input name="email" type="email" required placeholder="hello@example.com" />
      </div>

      <div className="field">
        <label>Location</label>
        <input name="location" required placeholder="Palakkad, Kerala" />
      </div>

      <button className="button" disabled={loading} type="submit">
        {loading ? "Creating your website…" : "Create website"}
      </button>
    </form>
  );
}
