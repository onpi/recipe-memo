import GetFormDataFunc from 'src/types/form';
import LoginForm from '../components/LoginForm';

const SignInPage = () => {
  const handleSignIn = (formData: { email: string; password: string }) => {
    console.log(formData);
    // ... その他の処理
  };
  return (
    <>
      <div className="page-wrap pt-16 flex flex-col items-center h-screen">
        <div className="logo">
          <div className="logo_wrap">
            <div className="logo_image flex items-center justify-center">
              <img src={`/images/logo.svg`} />
            </div>
            <p className="logo_text text-base mt-4">Welcome to Recipe Memo</p>
          </div>
        </div>
        <LoginForm
          renderButton={(getFormData: GetFormDataFunc) => (
            <button
              type="submit"
              className="base_btn w-full p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn(getFormData());
              }}
            >
              サインイン
            </button>
          )}
        />

        <p className="my-2">or</p>
        <div className="google_wrap px-4">
          <a href="">
            <div className="image_wrap">
              <img src={`/images/google_signin.svg`} alt="" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
