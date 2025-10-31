const { commit } = require('./github');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };
  const { slug, markdown } = JSON.parse(event.body);
  const date = new Date().toISOString().slice(0, 10);
  const filename = `posts/${date}-${slug}.md`;
  try {
    await commit(filename, markdown, `chore: add ${filename}`);
    return { statusCode: 200, body: JSON.stringify({ ok: 1 }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};