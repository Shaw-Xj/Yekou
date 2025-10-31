import { useEffect, useState } from 'react';

export default function Media() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fetch('/api/listDisk')
      .then(r => r.json())
      .then(setFiles)
      .catch(() => {});
  }, []);

  const upload = e => {
    const f = e.target.files[0];
    if (!f) return;
    const body = new FormData();
    body.append('file', f);
    fetch('/api/uploadDisk', { method: 'POST', body })
      .then(() => window.location.reload())
      .catch(() => {});
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>媒体库</h2>
      <input type="file" onChange={upload} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
        {files.map(item => (
          <div key={item.file_id} style={{ border: '1px solid #ddd', padding: 8 }}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}