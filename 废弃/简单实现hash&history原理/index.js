
// hash路径的情况下 监听不同的hash值 加载不同的页面
window.addEventListener('hashchange', () => {
  const el = document.getElementById('router')
  el.innerText = window.location.hash.slice(1)
})
