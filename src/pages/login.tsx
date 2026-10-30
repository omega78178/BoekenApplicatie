import Logo from "../components/Logo";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-bg-canvas flex flex-col lg:flex-row overflow-hidden bg-cobalt">
        <div className="flex-1 px-6 py-10 lg:px-20 lg:py-16 gap-8 bg-action-primary border-b-2 lg:border-b-0 lg:border-r-2 border-border-strong flex flex-col justify-between items-start">
          <div className="size- inline-flex justify-start items-center gap-3">
            <Logo />
          </div>
          <div className="hidden lg:block w-[560px] h-96 relative">
            {/* Lijnen: eigen container */}
            <div className="absolute inset-0 opacity-25">
              <div className="w-1 h-96 left-0 top-0 absolute bg-black outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[40px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[80px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[120px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[160px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[200px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[240px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[280px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[320px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[360px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[400px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[440px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[480px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[520px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-1 h-96 left-[560px] top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-0 absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[40px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[80px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[120px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[160px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[200px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[240px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[280px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[320px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
              <div className="w-[560px] h-1 left-0 top-[360px] absolute bg-black outline outline-1 outline-offset-[-0.50px] outline-white" />
            </div>

            {/* Figuren: eigen container */}
            <div className="absolute inset-0">
              <div className="w-48 h-56 left-[46.86px] top-[89.84px] absolute">
                <div className="w-40 h-48 left-0 top-[22.27px] absolute bg-white outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
                <div className="size-12 left-[108.93px] top-[6.96px] absolute bg-amber-300 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
                <div className="w-24 h-2.5 left-[34.90px] top-[98.15px] absolute bg-neutral-900" />
                <div className="w-16 h-2.5 left-[37.68px] top-[117.95px] absolute bg-neutral-900" />
              </div>

              <div className="w-40 h-48 left-[260.89px] top-[72.19px] absolute bg-white outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
              <div className="size-12 left-[370.29px] top-[83.68px] absolute bg-pink-300 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
              <div className="size-12 left-[289.06px] top-[129.44px] absolute bg-pink-300 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
              <div className="size-28 left-[420px] top-[210px] absolute bg-red-500 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
              <div className="w-36 h-28 left-[360px] top-[40px] absolute bg-emerald-300 outline outline-[3px] outline-offset-[-1.50px] outline-neutral-900" />
            </div>
          </div>
          <div className="justify-start">
            <span className="text-text-inverse text-4xl lg:text-7xl text-white font-semibold font-['Fraunces'] leading-tight lg:leading-[72px]">
              Welkom terug,
              <br />
            </span>
            <span className="text-text-inverse text-4xl lg:text-7xl text-white font-semibold font-['Fraunces'] leading-tight lg:leading-[72px]">
              boekenwurm.
            </span>
          </div>
        </div>
        <div className="flex-1 px-6 py-10 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm p-6 lg:p-10 bg-bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex flex-col justify-start items-start gap-6">
            <div className="size- flex flex-col justify-start items-start gap-2">
              <div
                data-type="Admin"
                className="size- px-3 py-1 bg-action-primary rounded-[999px] outline outline-[1.50px] outline-offset-[-1.50px] outline-border-strong inline-flex justify-start items-center gap-1"
              >
                <div className="justify-start text-text-inverse text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
                  Admin
                </div>
              </div>
              <div className="justify-start text-text-primary text-5xl font-semibold font-['Fraunces'] leading-10">
                Inloggen
              </div>
            </div>
            <div
              data-state="Default"
              className="self-stretch flex flex-col justify-start items-start gap-2"
            >
              <div className="justify-start text-text-primary text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
                E-mailadres
              </div>
              <div className="self-stretch px-4 py-3 bg-bg-surface rounded-xl outline outline-2 outline-offset-[-2px] outline-border-strong inline-flex justify-start items-start">
                <div className="justify-start text-text-primary text-base font-normal font-['DM_Sans'] leading-6">
                  admin@admin.com
                </div>
              </div>
            </div>
            <div
              data-state="Focus"
              className="self-stretch flex flex-col justify-start items-start gap-2"
            >
              <div className="justify-start text-text-primary text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
                Wachtwoord
              </div>
              <div className="self-stretch px-4 py-3 bg-bg-surface rounded-xl shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-[3px] outline-offset-[-3px] outline-border-focus inline-flex justify-start items-start">
                <div className="justify-start text-text-primary text-base font-normal font-['DM_Sans'] leading-6">
                  •••••
                </div>
              </div>
            </div>
            <div
              data-show-icon="false"
              data-variant="Primary"
              className="self-stretch px-6 py-3 bg-action-primary rounded-[999px] shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong inline-flex justify-center items-center gap-2"
            >
              <div className="justify-start text-text-inverse text-base font-bold font-['DM_Sans'] leading-4">
                Inloggen
              </div>
            </div>
            <div className="self-stretch justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
              Zonder login kun je alles bekijken. Genres toevoegen, wijzigen of
              verwijderen mag alleen een admin.
            </div>
            <div className="justify-start text-text-link text-base font-bold font-['DM_Sans'] leading-4">
              Verder zonder inloggen →
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
