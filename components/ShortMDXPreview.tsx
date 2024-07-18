// @ts-nocheck
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ReactNode } from "react";

interface ShortMDXPreviewProps {
  source: string;
  maxLength?: number;
}

interface ComponentProps {
  children: ReactNode;
}

const ShortMDXPreview = async ({
  source,
  maxLength = 300,
}: ShortMDXPreviewProps) => {
  let currentLength = 0;
  let reachedLimit = false;

  const components: MDXRemoteProps["components"] = {
    p: ({ children }: ComponentProps) => {
      console.log(reachedLimit);
      if (reachedLimit) return null;

      const text = children?.toString() || "";
      if (text === "") return null;
      if (text === "[object Object]") return null;
      if (currentLength + text.length <= maxLength) {
        currentLength += text.length;
        return <p>{text}</p>;
      } else {
        const remainingLength = maxLength - currentLength;
        reachedLimit = true;
        return <p>{text.slice(0, remainingLength)}...</p>;
      }
    },
    h1: ({ children }: ComponentProps) => {
      if (reachedLimit) return null;
      return <h1>{children}</h1>;
    },
    h2: ({ children }: ComponentProps) => {
      if (reachedLimit) return null;
      return <h2>{children}</h2>;
    },
    img: () => {
      return null;
    },
    picture: () => null,
    // Add other elements as needed
  };

  return <MDXRemote source={source} components={components} />;
};

export default ShortMDXPreview;
