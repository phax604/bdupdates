import { slug } from "github-slugger";
import Link from "next/link";
import type { FC } from "react";

interface TagProps {
  text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(" ").join("-")}
    </Link>
  );
};

export default Tag;
