import { NextResponse } from "next/server";

import { getPublicEmailAccounts } from "@/lib/email/accounts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getPublicEmailAccounts());
}
