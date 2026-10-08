export default function HistorySkeleton() {
  return (
    <div className="flex gap-5">
      {/* nav */}
      <div
        className="flex-1 border-r border-(--lgrey) relative

      before:absolute before:w-5 before:h-5 before:content-[''] before:block before:border-2 before:border-(--red) before:right-0 before:translate-x-1/2 before:bg-(--white) 
      
      after:absolute after:w-3 after:h-3 after:content-[''] after:block after:border-2 after:border-(--red) after:right-0 after:top-0 after:translate-x-1/2 after:translate-y-1  after:bg-(--red) 
      ">
        <div className="pr-5">
          <div className="w-11 h-7 bg-(--lgrey) animate-pulse ml-auto" />
          <div className="w-3 h-5 bg-(--lgrey) animate-pulse ml-auto mt-1" />
        </div>
      </div>

      <div className="flex-5 md:flex-10 flex flex-col md:flex-row gap-5">
        {/* img */}
        <div className="md:flex-1">
          <div className="w-full h-full items-top bg-(--lgrey) animate-pulse" />
        </div>
        {/* content */}
        <div className="md:py-5 md:flex-2 border-b border-(--lgrey) md:border-b-0 md:border-t">
          <div className="w-5 h-5 bg-(--lgrey) animate-pulse" />
          <div className="mt-2.5 mb-5">
            <div className="w-64 h-8 bg-(--lgrey) animate-pulse" />
            <div className="w-72 h-7 bg-(--lgrey) animate-pulse mt-1" />
          </div>
          <div>
            <ul>
              <li className="py-2.5 border-t border-(--lgrey) flex items-center">
                <span className="small text-(--grey) inline-block w-25">
                  출시일
                </span>
                <div className="w-20 h-6 bg-(--lgrey) animate-pulse" />
              </li>
              <li className="py-2.5 border-t border-(--lgrey) flex items-center">
                <span className="small text-(--grey) inline-block w-25">
                  출시 플랫폼
                </span>
                <div className="w-50 h-6 bg-(--lgrey) animate-pulse" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
