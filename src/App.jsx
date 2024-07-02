// App.js
import { useState, useEffect } from 'react';
import './App.css';
import Editor from './components/Editor';
import useLocalStorage from './components/UseLocalStorage';

function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const resetEditor = () => {
    setHtml('');
    setCss('');
    setJs('');
  };

  return (
    <>
      <div className='pane top-pane'>
        <Editor
          displayName="HTML"
          language="xml"
          value={html}
          onChange={setHtml}
        />
        <Editor
          displayName="CSS"
          language="css"
          value={css}
          onChange={setCss}
        />
        <Editor
          displayName="JS"
          language="javascript"
          value={js}
          onChange={setJs}
        />
        <div className='reset-butt-bg'>
        <button onClick={resetEditor} className='reset-button'>Reset</button>
        </div>
      </div>
      <div className='pane'>
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          width="100%"
          height="100%"
          frameborder="0"
        />
      </div>
    </>
  );
}

export default App;
