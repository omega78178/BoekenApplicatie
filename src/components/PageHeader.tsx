type PageHeaderProps = {
  title: string;
  searchText: string;
  buttonText: string;
};

export default function PageHeader({ title, searchText, buttonText }: PageHeaderProps) {
  return (
    <div className="w-full px-6 py-8 lg:px-20 lg:py-12 flex flex-wrap justify-between items-end gap-6">
      <div className="flex flex-col items-start gap-3">
        <div className="text-text-muted text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
          Collectie · 8 boeken
        </div>
        <div className="flex items-center gap-4">
          <div className="text-text-primary text-7xl font-semibold font-['Fraunces'] leading-[72px]">
            Alle {title}
          </div>
          <div className="size-14 relative origin-top-left rotate-12">
            <div className="size-16 left-[2.37px] top-[2.37px] absolute bg-amber-300 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-72 max-w-full px-4 py-3 bg-bg-surface rounded-xl outline outline-2 outline-offset-[-2px] outline-border-strong text-text-primary text-base font-normal font-['DM_Sans'] leading-6">
          {searchText}
        </div>
        <div className="px-6 py-3 bg-action-primary rounded-[999px] shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex items-center gap-2">
          <div className="size-5 relative">
            <div className="w-3 h-0 left-[4.17px] top-[10px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-inverse" />
            <div className="w-0 h-3 left-[10px] top-[4.17px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-inverse" />
          </div>
          <div className="text-text-inverse text-base font-bold font-['DM_Sans'] leading-4">
            {buttonText}
          </div>
        </div>
      </div>
    </div>
  );
}
