import dynamic from "next/dynamic";
import { fetchIssues, fetchTagsCount } from "~/lib/github";

const ListLayout = dynamic(() => import("~/components/ListLayout"), {
  ssr: false,
});

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const tagCounts = await fetchTagsCount();
  const tagKeys = Array.from(tagCounts.keys());
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }));
  return paths;
};

export default async function TaggedPosts({
  params,
  searchParams,
}: {
  params: { tag: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = searchParams?.page
    ? parseInt(searchParams.page as string)
    : 1;
  const perPage = 10;
  const { issues: posts, totalPages } = await fetchIssues(
    currentPage,
    perPage,
    params.tag
  );

  return (
    <div>
      <ListLayout
        posts={posts}
        title={params.tag.toUpperCase()}
        pagination={{
          currentPage,
          totalPages,
        }}
        initialDisplayPosts={posts}
      />
    </div>
  );
}
