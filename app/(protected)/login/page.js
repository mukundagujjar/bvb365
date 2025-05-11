const { default: SignInWithGoogle } = require("@/components/SignInWithGoogle");

const LoginPage = () => {
  return (
    <div>
      <SignInWithGoogle/>
      {/* Add your login form here */}
    </div>
  );
}

export default LoginPage;