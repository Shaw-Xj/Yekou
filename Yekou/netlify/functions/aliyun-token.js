const axios = require('axios');

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;
  const { data } = await axios.post('https://api.aliyundrive.com/v2/oauth/token', {
    client_id: process.env.ALI_ID,
    client_secret: process.env.ALI_SEC,
    code,
    grant_type: 'authorization_code',
    redirect_uri: `${process.env.URL}/.netlify/functions/aliyun-token`,
  });
  // 这里简单写环境变量（生产建议存数据库）
  process.env.ALI_REFRESH = data.refresh_token;
  return {
    statusCode: 302,
    headers: { Location: '/admin/#/settings?ok=1' },
  };
};