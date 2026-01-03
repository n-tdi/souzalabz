import { NextResponse } from "next/server";
import { CultsCurrency, CultsLocale, cultsGraphQL } from "@/lib/cults";
import { MY_CREATIONS } from "@/lib/queries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? 60);
  const offset = Number(searchParams.get("offset") ?? 0);

  const locale = (process.env.CULTS_LOCALE ?? "EN") as CultsLocale;
  const currency = (process.env.CULTS_CURRENCY ?? "USD") as CultsCurrency;

  const data = await cultsGraphQL<{
    myself: { creationsBatch: { total: number; results: unknown[] } };
  }>(MY_CREATIONS, { limit, offset, locale, currency });

  return NextResponse.json(data.myself.creationsBatch);
}
