import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";

function Login() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      <LoginHero />
      <div className="flex-1 px-6 py-10 flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
