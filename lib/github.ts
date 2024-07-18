import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type Issues = Awaited<ReturnType<typeof fetchIssues>>;
export async function fetchIssues(page = 1, perPage = 60, tag?: string) {
  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      state: "all",
      per_page: perPage,
      page: page,
      labels: tag,
    });
    const totalIssues = (
      await octokit.issues.listForRepo({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        state: "all",
        page: 1,
        per_page: 99999,
      })
    ).data.length;

    console.log(totalIssues);

    return {
      totalIssues,
      currentPage: page,
      totalPages: Math.ceil(totalIssues / perPage),
      issues: issues.map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        date: issue.created_at,
        tags: issue.labels.map((label) => (label as any).name),
        author: issue.user?.login,
        comments: issue.comments,
        url: issue.html_url,
      })),
    };
  } catch (err) {
    console.log(err);
    return {
      totalIssues: 0,
      currentPage: 1,
      totalPages: 1,
      issues: [],
    };
  }
}

export type Issue = Awaited<ReturnType<typeof fetchIssue>>;
export async function fetchIssue(issueNumber: number) {
  try {
    const { data: issue } = await octokit.issues.get({
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      issue_number: issueNumber,
    });

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body,
      date: issue.created_at,
      tags: issue.labels.map((label) => (label as any).name),
      author: issue.user?.login,
      comments: issue.comments,
      url: issue.html_url,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export type TagsCount = Awaited<ReturnType<typeof fetchTagsCount>>;
export async function fetchTagsCount() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    state: "all",
    per_page: 99999,
    page: 1,
  });

  const count = new Map<string, number>();

  issues.forEach((issue) => {
    issue.labels.forEach((label) => {
      // @ts-ignore
      count.set(label.name, (count.get(label.name) || 0) + 1);
    });
  });

  return count;
}
