const { uploadFile } = require('./aliyun-client');
const multipart = require('lambda-multipart'); // 轻量解析 FormData

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  const { files } = multipart.parse(event);
  const file = files[0]; // { filename, data, size }
  try {
    const id = await uploadFile(file.data, file.filename);
    return { statusCode: 200, body: JSON.stringify({ file_id: id }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};