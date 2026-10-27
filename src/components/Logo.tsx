// src/components/Logo.tsx
export default function Logo() {
  return (
    <div className="size- inline-flex justify-start items-center gap-3">
      <div className="size-11 relative">
        <div className="size-5 left-[1px] top-[1px] absolute bg-amber-300 outline outline-2 outline-offset-[-1px] outline-neutral-900" />
        <div className="size-5 left-[23px] top-[1px] absolute bg-red-500 outline outline-2 outline-offset-[-1px] outline-neutral-900" />
        <div className="size-5 left-[1px] top-[23px] absolute bg-blue-700 outline outline-2 outline-offset-[-1px] outline-neutral-900" />
        <div className="w-5 h-3 left-[23px] top-[27px] absolute bg-emerald-300 outline outline-2 outline-offset-[-1px] outline-neutral-900" />
      </div>
      <div className="justify-start">
        <span className="text-text-inverse text-2xl text-white font-semibold font-['Fraunces']">
          Buro
        </span>
        <span className="text-text-inverse text-2xl text-white font-semibold font-['Fraunces']">
          ogappeltjes
        </span>
      </div>
    </div>
  );
}
