import { Link } from "react-router";
import ContentItem from "./ContentItem";

export default function ContentList({
  contents,
  ref,
}: {
  contents: Content[];
  ref: (node?: Element | null | undefined) => void;
}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {contents.map((content, index: number) => (
        <li
          key={content.id}
          ref={index === contents.length - 1 ? ref : undefined}>
          <Link to={`/monster/${content.id}`}>
            <ContentItem content={content} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
