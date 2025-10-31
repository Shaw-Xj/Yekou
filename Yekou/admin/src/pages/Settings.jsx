export default function Settings() {
  const id = 'YOUR_ID';
  const url = `https://auth.aliyundrive.com/v2/oauth/authorize?client_id=${id}&redirect_uri=${location.origin}/.netlify/functions/aliyun-token&scope=user:base,file:all:read,file:all:write`;
  return (
    <div style={{ padding: 20 }}>
      <h2>网盘绑定</h2>
      <a className="btn" href={url}>
        绑定阿里云盘
      </a>
      <p style={{ marginTop: 10 }}>绑定后可从媒体库直接上传/浏览文件。</p>
    </div>
  );
}