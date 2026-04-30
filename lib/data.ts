// lib/data.ts
import fs from "fs";
import path from "path";

export type Lead = {
  id: number;
  name: string;
  email: string;
  status: string;
  isDeleted?: boolean; // 🚨 Added for Soft Delete
};

const dbPath = path.join(process.cwd(), "db.json");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify([
      { id: 1, name: "Asif", email: "asif@test.com", status: "New" },
      { id: 2, name: "Rahman", email: "rahman@test.com", status: "Contacted" },
    ], null, 2)
  );
}

export function getLeads(): Lead[] {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

export function saveLeads(leads: Lead[]) {
  fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));
}

export function generateId(): number {
  const leads = getLeads();
  return leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
}