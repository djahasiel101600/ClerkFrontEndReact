export default function Communications() {
  return (
    <>
      <div className="flex justify-center gap-20">
        <div className="basis-1/2 text-center font-medium p-20 shadow hover:scale-110 transition-transform duration-700">
          <a href="/communications/iar" className="hover:text-indigo-950">
            Inspection & Acceptance Report
          </a>
        </div>
        <div className="basis-1/2 text-center font-medium p-20 shadow hover:scale-110 transition-transform duration-700 ">
          <a href="/communications/po" className="hover:text-indigo-950">
            Purchase Order
          </a>
        </div>
      </div>
    </>
  );
}
