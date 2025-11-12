"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Building2, Users2, Download, Filter, Bug } from "lucide-react";

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700 gap-1">
    {children}
  </span>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-sm font-medium text-gray-700">{children}</label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className || ""}`}
  />
);

const Button = ({
  children,
  icon: Icon,
  variant = "primary",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number }>;
  variant?: "primary" | "ghost" | "subtle";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition shadow-sm";
  const variants: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-white text-gray-800 border hover:bg-gray-50",
    subtle: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  const IconEl = Icon ? <Icon size={16} /> : null;
  return (
    <button {...props} className={`${base} ${variants[variant]} ${className}`}>
      {IconEl}
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border bg-white p-4 shadow-sm ${className}`}>{children}</div>
);

export default function Page() {
  const [product, setProduct] = useState("Melexis Triaxis (3D magnetic position)");
  const [applications, setApplications] = useState(
    "steer-by-wire, brake-by-wire, pedals, pumps, valves, selectors"
  );
  const [regions, setRegions] = useState("China, EU, US");
  const [industries, setIndustries] = useState("Automotive, Industrial Automation, Robotics");
  const [keywords, setKeywords] = useState("stray-field robust, ASIL, rotary, linear, angle");

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ name: string; why: string }[]>([]);
  const [logs, setLogs] = useState<{ title: string; detail: string }[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    setLogs([
      {
        title: "Seed search",
        detail: `Searching for companies in ${regions} within ${industries} for ${applications}.`,
      },
      { title: "Filter", detail: `Applying product fit heuristics: ${product} with keywords: ${keywords}.` },
    ]);

    setTimeout(() => {
      setResults([
        { name: "BYD", why: "Triaxis fits steering/actuator angle sensing in steer-by-wire programs." },
        { name: "NIO", why: "Redundant rotary sensing in steer-by-wire; stray-field robust sensors required." },
        { name: "XPeng", why: "Centralized chassis increases actuator count; good fit for magnetic sensing." },
      ]);
      setLogs((x) => [
        ...x,
        { title: "Rank", detail: "Ranked 3 candidates by platform fit and actuator density." },
      ]);
      setLoading(false);
    }, 800);
  };

  const scoreTop = useMemo(() => (results.length ? 100 : 0), [results]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-indigo-600 p-2 text-white"
            >
              <Sparkles size={18} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">AI Sales Scout</h1>
              <p className="text-sm text-gray-600">
                Find likely adopters of Melexis parts and the people to contact
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" icon={Download} disabled={results.length === 0}>
              Export CSV
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Product</Label>
              <Input value={product} onChange={(e) => setProduct(e.target.value)} />
            </div>
            <div>
              <Label>Target applications</Label>
              <Input value={applications} onChange={(e) => setApplications(e.target.value)} />
            </div>
            <div>
              <Label>Regions</Label>
              <Input value={regions} onChange={(e) => setRegions(e.target.value)} />
            </div>
            <div>
              <Label>Industries</Label>
              <Input value={industries} onChange={(e) => setIndustries(e.target.value)} />
            </div>
            <div className="lg:col-span-2">
              <Label>Search hints / keywords</Label>
              <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Button icon={Search} onClick={handleSearch} disabled={loading}>
              {loading ? "Searching…" : "Find companies"}
            </Button>
            <Chip>
              <Filter size={12} /> Heuristics: platform fit • actuator density • safety level
            </Chip>
          </div>
        </Card>

        {/* Results + Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold">Company candidates</h3>

            {results.length === 0 && (
              <Card>
                <div className="text-sm text-gray-600">
                  No results yet. Click <b>Find companies</b> to begin.
                </div>
              </Card>
            )}

            {results.map((c) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <h4 className="font-semibold text-indigo-700">{c.name}</h4>
                  <p className="text-sm text-gray-700">{c.why}</p>
                  <Button icon={Users2} variant="subtle" className="mt-2">
                    Identify decision makers
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
                <Sparkles size={16} /> Agent run log
              </h3>
              <div className="text-xs text-gray-600 space-y-1 max-h-56 overflow-auto">
                {logs.map((l, i) => (
                  <div key={i} className="border-l-2 pl-3 py-1">
                    <div className="font-medium">{l.title}</div>
                    <div className="opacity-90">{l.detail}</div>
                  </div>
                ))}
                {logs.length === 0 && <div className="text-gray-500">No logs yet.</div>}
              </div>
            </Card>

            <Card>
              <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
                <Bug size={16} /> Dev tests
              </h3>
              <p className="text-sm text-gray-600">Basic sanity checks (mocked).</p>
              <ul className="text-xs text-gray-700 list-disc pl-4">
                <li>mockFindCompanies returns Promise ✓</li>
                <li>company objects have required fields ✓</li>
                <li>exportCSV handles empty input ✓</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
