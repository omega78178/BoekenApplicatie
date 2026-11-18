import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";

// Mobiel: blauw vlak boven, formulier eronder → gewoon scrollen, dat is normaal.
// Desktop (lg): twee helften naast elkaar, precies schermhoog (h-screen) → geen scrollbalk.
function Login() {
  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      <LoginHero />
      {/* Alleen op een héél laag scherm scrolt deze helft zelf (overflow-y-auto).
          m-auto: formulier in het midden, zonder dat de bovenkant wegvalt bij scrollen */}
      <div className="flex-1 lg:min-h-0 lg:overflow-y-auto px-6 py-10 flex">
        <div className="m-auto w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
