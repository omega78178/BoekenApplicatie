import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import group from "../assets/Group.svg";
import paperPurple from "../assets/paper_purple.svg";
import rondje from "../assets/rondje.svg";
import driehoek from "../assets/driehoek.svg";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
        <div className="flex-1 px-6 py-10 lg:px-20 lg:py-16 gap-8 bg-cobalt border-b-2 lg:border-b-0 lg:border-r-2 border-ink flex flex-col justify-between items-start">
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
              <img
                src={group}
                alt=""
                className="absolute left-[46px] top-[90px] w-[190px] h-[224px]"
              />
              <img
                src={paperPurple}
                alt=""
                className="absolute left-[252px] top-[62px] w-[184px] h-[219px]"
              />
              <img
                src={rondje}
                alt=""
                className="absolute left-[420px] top-[210px] w-[123px] h-[123px]"
              />
              <img
                src={driehoek}
                alt=""
                className="absolute left-[360px] top-[40px] w-[143px] h-[113px]"
              />
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
        <div className="flex-1 px-6 py-10 bg- flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm p-6 lg:p-10 bg-bg-surface rounded-xl shadow-[4px_4px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong flex flex-col justify-start items-start gap-6"
          >
            <div className="size- flex flex-col justify-start items-start gap-2">
              <div
                data-type="Admin"
                className="size- px-3 py-1 bg-action-primary rounded-[999px] outline outline-[1.50px] outline-offset-[-1.50px] outline-border-strong inline-flex justify-start items-center gap-1 bg-cobalt"
              >
                <div className="justify-start text-text-inverse text-white text-xs font-medium font-['DM_Mono'] uppercase leading-4 tracking-wide">
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@admin.com"
                  className="w-full bg-transparent outline-none text-text-primary text-base font-normal font-['DM_Sans'] leading-6"
                />
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
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-text-primary text-base font-normal font-['DM_Sans'] leading-6"
                  />
                </div>
              </div>
            </div>
            <div
              data-show-icon="false"
              data-variant="Primary"
              className="relative self-stretch px-6 py-3 bg-action-primary rounded-[999px] shadow-[2px_2px_0px_0px_rgba(22,19,15,1.00)] outline outline-2 outline-offset-[-2px] outline-border-strong inline-flex justify-center items-center gap-2 bg-cobalt"
            >
              <button
                type="submit"
                className="justify-start text-text-inverse text-white text-base font-bold font-['DM_Sans'] leading-4 cursor-pointer after:absolute after:inset-0 after:content-['']"
              >
                Inloggen
              </button>
            </div>
            <div className="self-stretch justify-start text-text-muted text-sm font-medium font-['DM_Sans'] leading-5">
              Zonder login kun je alles bekijken. Genres toevoegen, wijzigen of
              verwijderen mag alleen een admin.
            </div>
            <Link
              to="/book"
              className="text-text-link text-base font-bold font-['DM_Sans'] leading-4 text-cobalt"
            >
              Verder zonder inloggen →
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
