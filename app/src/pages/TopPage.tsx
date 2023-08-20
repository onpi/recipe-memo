import React, { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';

const TopPage = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <ThemeToggle />
      <div className="border border-gray-400 rounded-2xl p-2 m-2 flex justify-around items-center">
        <h1 className="text-3xl font-bold underline">Hello Tailwind CSS!</h1>
        <p className="m-0 text-gray-400">Tailwind CSSです</p>
        <button className="bg-gray-300 border-0 p-2 rounded-md hover:bg-gray-400 hover:text-white">
          ボタン
        </button>
      </div>
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
      <h1>Vite + React</h1>
      <p>automatic deploy({import.meta.env.MODE})</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn moreaaaa
      </p>
    </>
  );
};

export default TopPage;
