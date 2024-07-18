import Tag from "./Tag";

type TagListProps = {
  tags: string[];
};

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag text={tag} key={tag + index} />
      ))}
    </div>
  );
};

export default TagList;
