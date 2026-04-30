import { NextResponse } from "next/server";

let leads = [
  { id: 1, name: "Asif", email: "asif@mail.com", status: "New" },
];

// GET all leads
export async function GET() {
  return NextResponse.json(leads);
}

// POST (add lead)
export async function POST(req: Request) {
  const body = await req.json();

  const newLead = {
    id: Date.now(),
    ...body,
  };

  leads.push(newLead);

  return NextResponse.json(newLead);
}