export type CultsLocale = "EN" | "FR" | "ES" | "DE" | "IT";
export type CultsCurrency = "USD" | "EUR" | "GBP";

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

export async function cultsGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const user = process.env.CULTS3D_USER?.trim();
  const pass = process.env.CULTS3D_PASS?.trim();

  if (!user || !pass) {
    throw new Error("Missing CULTS3D_USER / CULTS3D_PASS. Check .env.local and restart dev server.");
  }

  // Node-safe base64
  const auth = Buffer.from(`${user}:${pass}`, "utf8").toString("base64");

  const res = await fetch("https://cults3d.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${auth}`,
      // Optional: sometimes helps with weird proxies
      "User-Agent": "nextjs-cults-vault",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // debug mode (remove later)
  });

  const text = await res.text();
  if (!res.ok) {
    // This helps you see exactly what's coming back
    throw new Error(`Cults GraphQL HTTP ${res.status}: ${text}`);
  }

  const json = JSON.parse(text) as GraphQLResponse<T>;
  if (json.errors?.length) throw new Error(`Cults GraphQL error: ${json.errors[0].message}`);
  if (!json.data) throw new Error("Cults GraphQL returned no data");

  return json.data;
}
