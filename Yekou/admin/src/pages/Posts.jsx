import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch('/api/listPosts')
      .then(r => r.json())
      .then(setList)
      .catch(() => {});
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>文章列表</h2>
      <Link to="/edit">+ 写新文章</Link>
      <ul style={{ marginTop: 16 }}>
        {list.map(p => (
          <li key={p.slug}>
            <Link to={`/edit/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}