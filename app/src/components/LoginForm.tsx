import React from 'react';
import { useState } from 'react';
import GetFormDataFunc from 'src/types/form';
type LoginFormProps = {
  renderButton: (getFormData: GetFormDataFunc) => JSX.Element;
};

const LoginForm: React.FC<LoginFormProps> = ({ renderButton }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const getFormData: GetFormDataFunc = () => ({ email, password });
  return (
    <form className="w-full">
      <div className="mt-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
          placeholder="example@example.com"
          autoComplete="email"
        />
      </div>

      <div className="mt-2">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
          placeholder="********"
          autoComplete="current-password"
        />
      </div>

      <div className="mt-4">{renderButton(getFormData)}</div>
    </form>
  );
};

export default LoginForm;
