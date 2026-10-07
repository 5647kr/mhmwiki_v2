import { Link } from "react-router";
import RelateItem from "./RelateItem";

export default function RelateList({
  list,
}: {
  list: { id: string; icon: string; name: string }[];
}) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
      {list.map((item) => (
        <li key={item.id}>
          <Link to={`/monster/${item.id}`}>
            <RelateItem item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
