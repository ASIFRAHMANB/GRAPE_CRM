import { NextResponse } from "next/server";
import { getLeads, saveLeads, Lead } from "@/lib/data";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leads = getLeads();
  
  // Convert URL string ID to Number for a perfect match
  const leadId = Number(id);
  const lead = leads.find((l) => Number(l.id) === leadId && !l.isDeleted);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const leadId = Number(id);
    const body = await req.json();
    const leads = getLeads();

    const index = leads.findIndex((l) => Number(l.id) === leadId && !l.isDeleted);
    
    if (index === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Merge updates while protecting the original numeric ID
    leads[index] = { 
      ...leads[index], 
      ...body, 
      id: leadId // Ensure ID stays a number
    };
    
    saveLeads(leads);

    return NextResponse.json(leads[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const leadId = Number(id);
  const leads = getLeads();

  const index = leads.findIndex((l) => Number(l.id) === leadId && !l.isDeleted);
  
  if (index === -1) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // Soft Delete: Keep the data, just hide it from the UI
  leads[index].isDeleted = true;
  saveLeads(leads);

  return NextResponse.json({ message: "Lead soft deleted successfully" });
}