import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  console.log(await request.json());

  const data = await request.json();

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // await generateSearch();

  revalidatePath(`/posts/${data.issue.number}`);

  revalidatePath(`/`);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
