import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useOneContentQuery } from "../../hooks/useContentQuery";

export default function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { data } = useOneContentQuery({
    search: input,
  });

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmitSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (data && data.length > 0) {
      const content = data[0];

      navigate(`/monster/${content.id}`);
      setInput("");
    } else {
      toast.error(`${input}의 검색결과가 없습니다. 다시 확인해주세요.`);
      setInput("");
    }
  };
  return (
    <form
      onSubmit={handleSubmitSearch}
      className="bg-(--white) py-3 px-5 flex gap-2.5 items-center">
      <SearchIcon />
      <input
        type="text"
        value={input}
        onChange={handleInputValue}
        placeholder="몬스터 이름을 검색하세요."
        className="flex-1 subParagraph"
      />
    </form>
  );
}
