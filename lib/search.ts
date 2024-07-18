import { existsSync, writeFileSync } from "fs";
import { fetchIssues } from "./github";

export async function generateSearch() {
  const { issues } = await fetchIssues(1, 9999999);
  const searches = issues.map((issue) => {
    return {
      id: issue.id,
      title: issue.title,
      date: issue.date,
      tags: issue.tags ?? [],
      path: `/posts/${issue.id}/${issue.number}`,
    };
  });

  if (!existsSync("./public/search.json")) {
    writeFileSync("./public/search.json", JSON.stringify(searches, null, 2));
  }

  return searches;
}
