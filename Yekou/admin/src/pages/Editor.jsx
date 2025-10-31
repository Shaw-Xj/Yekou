import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const md = window.markdownit();

export default function PostEditor() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    if (slug) axios(`/api/getPost?slug=${slug}`).then(r => setText(r.data.markdown));
  }, [slug]);

  async function save() {
    await axios.post('/api/savePost', { slug: slug || new Date().toISOString().slice(0,10), markdown: text });
    nav('/');
  }

  return (
    <div style={{display:'flex', height:'100vh'}}>
      <div style={{flex:1}}>
        <Editor height="100%" language="markdown" value={text} onChange={v=>setText(v||'')} />
      </div>
      <div style={{flex:1, overflow:'auto', padding:20}}>
        <div dangerouslySetInnerHTML={{__html: md.render(text)}} className="markdown-body" />
      </div>
      <button onClick={save} style={{position:'fixed', right:30, bottom:30}} className="btn">发布</button>
    </div>
  );
}