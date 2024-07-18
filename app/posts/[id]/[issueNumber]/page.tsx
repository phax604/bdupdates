import { format } from "date-fns";

import { MDXRemote } from "next-mdx-remote/rsc";
import TagList from "~/components/TagList";
import { fetchIssue, fetchIssues } from "~/lib/github";

export const dynamicParams = true;

export async function generateStaticParams() {
  const { issues } = await fetchIssues();
  return issues.map((issue) => ({
    id: issue.id.toString(),
  }));
}

export default async function Post({
  params,
}: {
  params: { id: string; issueNumber: string };
}) {
  const issue = await fetchIssue(parseInt(params.issueNumber));

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="">
      <div className="">
        <TagList tags={issue.tags ?? []} />
      </div>
      <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>

      <p className="text-gray-600 mb-4">
        {format(new Date(issue.date), "MMMM d, yyyy")}
      </p>

      <hr className="mb-4" />

      <MDXRemote source={issue.body || ""} />
    </div>
  );
}
