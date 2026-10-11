export default function Footer() {
  return (
    <footer className="bg-(--black)">
      <div className="py-10 px-5 w-full max-w-7xl mx-auto text-(--white)">
        <div className="py-5">
          <h2 className="title mb-2.5">MONSTER HUNTER MONSTER WIKI</h2>
          <p className="subParagraph">비공식 몬스터 헌터 몬스터 위키</p>
        </div>
        <div className="py-5 border-t border-(--dgrey)">
          <p className="small text-(--grey)">
            본 사이트는 팬 메이드 사이트로 CAPCOM 공식 사이트는 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
