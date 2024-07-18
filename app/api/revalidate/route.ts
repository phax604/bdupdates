import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret");
    console.log(await request.json());

    const data = await request.json();

    if (secret !== process.env.REVALIDATION_TOKEN) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    revalidatePath(`/posts/${data.issue.id}/${data.issue.number}`);

    revalidatePath(`/`);

    revalidatePath(`/tags`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
