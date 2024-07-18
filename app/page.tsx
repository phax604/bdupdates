import { formatDate } from "date-fns/format";
import Link from "next/link";
import ShortMDXPreview from "~/components/ShortMDXPreview";
import TagList from "~/components/TagList";
import { fetchIssues } from "../lib/github";

export const revalidate = 3600; // Revalidate every hour

const MAX_DISPLAY = 5;

export default async function Home() {
  const { issues: posts } = await fetchIssues();

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const {
              date,
              title,
              tags,
              id,
              url,
              author,
              comments,
              body,
              number: issueNumber,
            } = post;
            return (
              <li key={id} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, "MMMM dd, yyyy")}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/posts/${id}/${issueNumber}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            <TagList tags={tags} />
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          <ShortMDXPreview source={body!} maxLength={100} />
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/posts/${id}/${issueNumber}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
    // <div className="max-w-2xl mx-auto py-8">
    //   <h1 className="text-3xl font-bold mb-8">Open Source Journals</h1>
    //   {issues.map((issue, index) => (
    //     <div key={issue.id} className="no-underline">
    //       <div key={issue.id} className=" hover:bg-gray-50 px-2 py-1">
    //         <h2 className="text-xl font-semibold">
    //           <Link
    //             href={`/posts/${issue.id}`}
    //             className="text-black no-underline"
    //           >
    //             {issue.title}
    //           </Link>
    //         </h2>
    //         <p className="text-gray-600">
    //           {format(new Date(issue.date), "MMMM d, yyyy")} by {issue.author}
    //         </p>
    //         <TagList tags={issue.tags ?? []} />
    //       </div>
    //       {issues.length - 1 > index ? <hr className="" /> : null}
    //     </div>
    //   ))}
    // </div>
  );
}
