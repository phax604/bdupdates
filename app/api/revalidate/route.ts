import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { generateSearch } from "~/lib/search";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const data = await request.json();

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  await generateSearch();

  revalidatePath(`/posts/${data.issue.number}`);

  revalidatePath(`/`);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
