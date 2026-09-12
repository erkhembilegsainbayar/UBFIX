"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Check,
  Users,
  Construction,
  Trash2,
  Lightbulb,
  Footprints,
  TrafficCone,
  ShieldCheck,
  Plus,
  Expand,
} from "lucide-react";
import { useApp } from "@/components/provider";
import ReportCard from "@/components/report-card";
const IssueMap = dynamic(() => import("@/components/issue-map"), {
  ssr: false,
  loading: () => <div className="map-loading-static">Loading map…</div>,
});
export default function Home() {
  const { reports, demo, lang, error, reload } = useApp();
  const [cat, setCat] = useState("All issues");
  const visible = reports.filter((r) => !r.rejected);
  const filtered = visible.filter(
    (r) => cat === "All issues" || r.category === cat,
  );
  const chips = [
    ["All issues", MapPin],
    ["Pothole / Road", Construction],
    ["Trash", Trash2],
    ["Streetlight", Lightbulb],
    ["Sidewalk", Footprints],
    ["Traffic Light", TrafficCone],
    ["Pedestrian Safety", ShieldCheck],
  ] as const;
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            OUR CITY. OUR RESPONSIBILITY.
          </div>
          <h1>
            See it. Report it.
            <br />
            <span>Fix it.</span>
          </h1>
          <p>
            A community-powered platform for reporting and tracking
            <br className="desktop-break" /> problems across Ulaanbaatar.
          </p>
          <div className="hero-actions">
            <Link href="/report/new/" className="button primary">
              {lang === "mn" ? "Асуудал мэдээлэх" : "Report an Issue"}
              <ArrowUpRight size={19} />
            </Link>
            <Link href="/map/" className="button secondary">
              <MapPin size={17} />
              Explore the map
            </Link>
          </div>
          <div className="community-note">
            <div className="avatar-stack">
              <b>Б</b>
              <b>А</b>
              <b>Н</b>
              <b>Т</b>
            </div>
            <span>
              Small reports. <strong>Real change.</strong>
            </span>
          </div>
        </div>
        <div className="hero-side">
          <div className="city-coordinate">47.9184° N &nbsp; 106.9177° E</div>
          <div className="stat">
            <span className="stat-icon peach">
              <MapPin />
            </span>
            <div>
              <strong>
                {demo
                  ? "237"
                  : visible.filter((r) => r.status !== "Fixed").length}
              </strong>
              <span>
                {lang === "mn" ? "Идэвхтэй мэдээллүүд" : "Active reports"}
              </span>
            </div>
            <span className="stat-context">
              Let’s get them fixed <ArrowUpRight size={14} />
            </span>
          </div>
          <div className="stat">
            <span className="stat-icon mint">
              <Check />
            </span>
            <div>
              <strong>
                {demo
                  ? "68"
                  : visible.filter(
                      (r) =>
                        r.status === "Fixed" &&
                        r.updated_at.slice(0, 7) ===
                          new Date().toISOString().slice(0, 7),
                    ).length}
              </strong>
              <span>Fixed this month</span>
            </div>
            <span className="stat-context green">A city getting better</span>
          </div>
          <div className="stat">
            <span className="stat-icon blue">
              <Users />
            </span>
            <div>
              <strong>
                {demo
                  ? "1,240"
                  : visible
                      .reduce((a, r) => a + r.vote_count, 0)
                      .toLocaleString()}
              </strong>
              <span>Community votes</span>
            </div>
            <span className="stat-context">Every voice counts</span>
          </div>
          {demo && (
            <small className="stats-caption">
              Illustrative community statistics
            </small>
          )}
        </div>
      </section>
      <section className="shell city-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ON THE GROUND</span>
            <h2>
              Your city, in focus<span className="orange">.</span>
            </h2>
          </div>
          <Link className="text-link" href="/map/">
            Open full map <Expand size={16} />
          </Link>
        </div>
        <div className="map-panel">
          <div className="map-toolbar">
            {chips.map(([name, Icon]) => (
              <button
                key={name}
                className={"chip " + (cat === name ? "selected" : "")}
                onClick={() => setCat(name)}
              >
                <Icon size={16} />
                {name === "Pothole / Road"
                  ? "Roads"
                  : name === "Pedestrian Safety"
                    ? "Safety"
                    : name === "Traffic Light"
                      ? "Traffic"
                      : name === "Streetlight"
                        ? "Lighting"
                        : name}
              </button>
            ))}
          </div>
          {error ? (
            <div className="empty-state">
              Could not load reports.{" "}
              <button onClick={() => void reload()}>Try again</button>
            </div>
          ) : (
            <IssueMap reports={filtered} />
          )}
          <div className="map-foot">
            <span>
              <i className="legend-dot orange-bg" />
              Unresolved <i className="legend-dot green-bg" />
              Fixed
            </span>
            <span>
              {filtered.length} {demo ? "demo " : ""}reports on the map{" "}
              <span className="muted">· Click a pin to explore</span>
            </span>
          </div>
        </div>
      </section>
      <section className="shell trending">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A LITTLE SUPPORT GOES A LONG WAY</span>
            <h2>
              Help move these forward<span className="orange">.</span>
            </h2>
            <p>The issues your neighbors are talking about.</p>
          </div>
          <Link className="text-link" href="/reports/">
            View all reports <ArrowRight size={17} />
          </Link>
        </div>
        <div className="report-grid">
          {visible
            .filter((r) => r.status !== "Fixed")
            .sort((a, b) => b.vote_count - a.vote_count)
            .slice(0, 4)
            .map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
        </div>
      </section>
      <section className="shell join-banner">
        <div>
          <span className="eyebrow">BETTER STREETS START WITH YOU</span>
          <h2>One report can make a difference.</h2>
          <p>Notice something on your way home? Put it on the map.</p>
        </div>
        <Link className="button primary" href="/report/new/">
          <Plus size={18} />
          Report an Issue
        </Link>
      </section>
    </main>
  );
}
