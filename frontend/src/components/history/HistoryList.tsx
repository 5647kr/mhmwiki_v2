import HistoryItem from "./HistoryItem";

export default function HistoryList({ series }: { series: Series[] }) {
  return (
    <ol>
      {series.map((content, index) => (
        <li key={content.id} className="mt-20">
          <HistoryItem content={content} index={index} />
        </li>
      ))}
    </ol>
  );
}
