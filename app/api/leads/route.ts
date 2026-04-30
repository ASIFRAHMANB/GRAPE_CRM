import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

// Helper function to read the file safely
async function getLeadsFromFile() {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file doesn't exist yet
  }
}

// GET all leads
export async function GET() {
  const leads = await getLeadsFromFile();
  return NextResponse.json(leads);
}

// POST (add a new lead with Numeric ID)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Basic Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const leads = await getLeadsFromFile();

    // 2. Generate Incrementing Numeric ID
    // We look at all existing IDs, find the highest one, and add 1.
    // This ensures your new lead becomes #121, #122, etc.
    const nextId = leads.length > 0 
      ? Math.max(...leads.map((l: any) => Number(l.id))) + 1 
      : 1;

    const newLead = {
      id: nextId, // Saved as a Number
      name: body.name,
      email: body.email,
      status: body.status || "New",
    };

    leads.push(newLead);

    // 3. Save asynchronously to db.json
    await fs.writeFile(dbPath, JSON.stringify(leads, null, 2));

    return NextResponse.json(newLead, { status: 201 });

  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}