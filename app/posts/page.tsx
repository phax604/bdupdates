import dynamic from "next/dynamic";
import { fetchIssues } from "~/lib/github";

const ListLayout = dynamic(() => import("~/components/ListLayout"), {
  ssr: false,
});

export default async function Posts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = searchParams?.page
    ? parseInt(searchParams.page as string)
    : 1;
  const perPage = 10;
  const { issues: posts, totalPages } = await fetchIssues(currentPage, perPage);

  return (
    <div>
      <ListLayout
        posts={posts || []}
        title="Posts"
        pagination={{
          currentPage,
          totalPages,
        }}
        initialDisplayPosts={posts}
      />
    </div>
  );
}
