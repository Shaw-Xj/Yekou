// =================== 页面路由 ===================
function showPage(pageId) {
  // 隐藏所有页
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // 显示目标页
  const selected = document.getElementById(pageId);
  if (selected) selected.classList.add('active');
  // 滚动到顶部
  window.scrollTo(0, 0);
}

// =================== 主内容区 ===================
const app = document.getElementById('app');   // 主挂载点

// 简易模板生成
function html(strings, ...vals) {
  return strings.reduce((s, str, i) => s + str + (vals[i] || ''), '');
}

// 各页模板
const pages = {
  home: () => html`
    <div id="home" class="page active">
      <div class="profile-card">
        <div class="profile-img">👤</div>
        <h1>欢迎来到我的个人博客</h1>
        <p>你好！我是一名热爱技术的博主，喜欢分享编程、设计和生活的点点滴滴。</p>
        <p>在这里，你可以找到我的技术文章、项目经验和个人思考。</p>
        <br/>
        <p>📧 邮箱：example@email.com</p>
        <p>📍 位置：中国 · 北京</p>
        <p>💼 职业：全栈开发工程师</p>
      </div>
    </div>`,

  blog: () => html`
    <div id="blog" class="page">
      <h1 style="text-align:center; margin-bottom:2rem;">我的博客文章</h1>
      <div class="blog-posts">
        <div class="blog-card">
          <h3>探索现代Web开发技术</h3>
          <div class="blog-meta">2024年1月15日 | 技术分享</div>
          <p>深入了解React、Vue等前端框架的最新发展趋势，以及如何在项目中选择合适的工具...</p>
          <button class="btn" onclick="alert('阅读更多功能待实现')">阅读更多</button>
        </div>
        <div class="blog-card">
          <h3>我的编程学习之路</h3>
          <div class="blog-meta">2024年1月10日 | 个人成长</div>
          <p>从零基础到全栈开发，分享我的学习经验和踩过的坑，希望能帮助到正在学习编程的你...</p>
          <button class="btn" onclick="alert('阅读更多功能待实现')">阅读更多</button>
        </div>
        <div class="blog-card">
          <h3>设计模式在实际项目中的应用</h3>
          <div class="blog-meta">2024年1月5日 | 技术深度</div>
          <p>通过实际案例讲解常用设计模式的应用场景，让你的代码更加优雅和可维护...</p>
          <button class="btn" onclick="alert('阅读更多功能待实现')">阅读更多</button>
        </div>
      </div>
    </div>`,

  about: () => html`
    <div id="about" class="page">
      <div class="about-content">
        <h1 style="text-align:center; margin-bottom:2rem;">关于我</h1>
        <h2>技能专长</h2>
        <ul style="margin:1rem 0 2rem 2rem;">
          <li>前端开发：HTML5, CSS3, JavaScript, React, Vue.js</li>
          <li>后端开发：Node.js, Python, Java, MySQL, MongoDB</li>
          <li>工具使用：Git, Docker, Jenkins, AWS</li>
          <li>其他：UI/UX设计, 敏捷开发, 团队协作</li>
        </ul>
        <h2>工作经历</h2>
        <p style="margin:1rem 0;"><strong>高级全栈开发工程师</strong> - XX科技公司 (2020-至今)</p>
        <p style="margin:1rem 0;"><strong>前端开发工程师</strong> - YY互联网公司 (2018-2020)</p>
        <h2>教育背景</h2>
        <p style="margin:1rem 0;"><strong>计算机科学学士</strong> - XX大学 (2014-2018)</p>
      </div>
    </div>`,

  contact: () => html`
    <div id="contact" class="page">
      <h1 style="text-align:center; margin-bottom:2rem;">联系我</h1>
      <div class="contact-form">
        <form onsubmit="handleSubmit(event)">
          <div class="form-group">
            <label>您的姓名</label>
            <input type="text" name="name" required />
          </div>
          <div class="form-group">
            <label>您的邮箱</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>留言内容</label>
            <textarea name="message" required></textarea>
          </div>
          <button type="submit" class="btn">发送留言</button>
        </form>
      </div>
    </div>`
};

// 首次渲染
app.innerHTML = pages.home() + pages.blog() + pages.about() + pages.contact();

// =================== 表单提交 ===================
function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  alert(`感谢留言，${data.get('name')}！\n我们会尽快回复到：${data.get('email')}`);
  e.target.reset();
}

// =================== 滚动时导航栏阴影 ===================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
  } else {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  }
});