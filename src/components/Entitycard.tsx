export default function Entitycard() {
  return (
    <div
      data-type="Book"
      className="w-72 p-6 relative bg-bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong inline-flex flex-col justify-start items-start gap-4 overflow-hidden"
    >
      <div className="size-14 left-[240px] top-0 absolute">
        <div className="size-14 left-0 top-0 absolute bg-entity-book" />
        <div className="size-14 left-0 top-0 absolute bg-black outline outline-2 outline-offset-[-1px] outline-border-strong" />
      </div>
      <div
        data-type="Book"
        className="size- px-3 py-1 bg-entity-book rounded-[999px] outline outline-[1.50px] outline-offset-[-1.50px] outline-border-strong inline-flex justify-start items-center gap-1"
      >
        <div className="justify-start text-text-primary text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
          Boek
        </div>
      </div>
      <div className="self-stretch justify-start text-text-primary text-2xl font-semibold font-['Fraunces'] leading-7">
        De Avonden
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="self-stretch justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
          Gerard Reve · 1947
        </div>
        <div className="justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
          Roman
        </div>
      </div>
      <div className="self-stretch h-0.5 bg-border-subtle" />
      <div className="self-stretch inline-flex justify-end items-start gap-2">
        <div
          data-action="Edit"
          className="size- p-2 bg-bg-surface rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex justify-start items-start"
        >
          <div className="size-5 relative">
            <div className="size-5 left-0 top-0 absolute">
              <div className="size-4 left-[1.67px] top-[1.67px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
            </div>
          </div>
        </div>
        <div
          data-action="Delete"
          className="size- p-2 bg-feedback-error-soft rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex justify-start items-start"
        >
          <div className="size-5 relative">
            <div className="size-5 left-0 top-0 absolute">
              <div className="w-3.5 h-0 left-[2.50px] top-[5px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
              <div className="w-3 h-3.5 left-[4.17px] top-[5px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
              <div className="w-1.5 h-[3.33px] left-[6.67px] top-[1.67px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
