import Logo from "../components/Logo";

export default function Header() {
  return (
    <header>
      <div className="w-full px-6 py-4 lg:px-20 lg:py-5 bg-bg-canvas border-b-2 border-border-strong flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="size- inline-flex justify-start items-center gap-3">
            <Logo variant="dark" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            data-entity="Books"
            data-state="Active"
            className="px-4 py-2 bg-entity-book rounded-[999px] shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex items-center gap-2"
          >
            <div className="size-4 relative">
              <div className="size-3.5 left-[1px] top-[1px] absolute bg-bg-surface outline outline-2 outline-offset-[-1px] outline-neutral-900" />
            </div>
            <div className="text-text-primary text-base font-bold font-['DM_Sans'] leading-4">
              Boeken
            </div>
          </div>
          <div
            data-entity="Authors"
            data-state="Inactive"
            className="px-4 py-2 rounded-[999px] outline outline-2 outline-offset-[-2px] outline-border-strong flex items-center gap-2"
          >
            <div className="size-4 relative">
              <div className="size-3.5 left-[1px] top-[1px] absolute bg-entity-author outline outline-2 outline-offset-[-1px] outline-neutral-900" />
            </div>
            <div className="text-text-muted text-base font-bold font-['DM_Sans'] leading-4">
              Auteurs
            </div>
          </div>
          <div
            data-entity="Genres"
            data-state="Inactive"
            className="px-4 py-2 rounded-[999px] outline outline-2 outline-offset-[-2px] outline-border-strong flex items-center gap-2"
          >
            <div className="size-4 relative">
              <div className="w-3.5 h-3 left-[1px] top-[1.50px] absolute bg-entity-genre outline outline-2 outline-offset-[-1px] outline-neutral-900" />
            </div>
            <div className="text-text-muted text-base font-bold font-['DM_Sans'] leading-4">
              Genres
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            data-type="Admin"
            className="px-3 py-1 bg-action-primary rounded-[999px] outline outline-[1.50px] outline-offset-[-1.50px] outline-border-strong flex items-center gap-1"
          >
            <div className="text-text-inverse text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
              Admin
            </div>
          </div>
          <div
            data-show-icon="true"
            data-variant="Ghost"
            className="px-6 py-3 rounded-[999px] outline outline-2 outline-offset-[-2px] outline-border-strong flex items-center gap-2"
          >
            <div className="size-5 relative">
              <div className="size-5 left-0 top-0 absolute">
                <div className="w-[5px] h-3.5 left-[2.50px] top-[2.50px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
                <div className="w-1 h-2 left-[13.33px] top-[5.83px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
                <div className="w-2.5 h-0 left-[7.50px] top-[10px] absolute outline outline-2 outline-offset-[-1.13px] outline-text-primary" />
              </div>
            </div>
            <div className="text-text-primary text-base font-bold font-['DM_Sans'] leading-4">
              Uitloggen
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
