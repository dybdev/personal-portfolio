async function check() {
  const r = await fetch('http://localhost:3000/');
  const t = await r.text();
  const matches = [...t.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => decodeURIComponent(m[1]));
  console.log(matches);
}
check();
