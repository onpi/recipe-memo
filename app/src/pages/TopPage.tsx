import React, { useState } from 'react';

const TopPage = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                </a>
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
