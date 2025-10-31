const axios = require('axios');

// 自动刷新 access_token
async function getToken() {
  const { data } = await axios.post('https://api.aliyundrive.com/v2/oauth/token', {
    refresh_token: process.env.ALI_REFRESH,
    grant_type: 'refresh_token',
    client_id: process.env.ALI_ID,
    client_secret: process.env.ALI_SEC,
  });
  process.env.ALI_REFRESH = data.refresh_token; // 回写
  return data.access_token;
}

// 列目录
exports.listFolder = async (parent_file_id = 'root') => {
  const token = await getToken();
  const { data } = await axios.post(
    'https://api.aliyundrive.com/v3/file/list',
    { drive_id: 'default', parent_file_id, limit: 200 },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.items;
};

// 直传文件（≤5G 单文件简化版）
exports.uploadFile = async (stream, name, parent_file_id = 'root') => {
  const token = await getToken();
  // 1. 预创建
  const { data: pre } = await axios.post(
    'https://api.aliyundrive.com/v3/file/create',
    { drive_id: 'default', parent_file_id, name, type: 'file', check_name_mode: 'refuse' },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  // 2. 上传
  await axios.put(pre.part_info_list[0].upload_url, stream, {
    headers: { 'Content-Type': '' },
  });
  return pre.file_id;
};