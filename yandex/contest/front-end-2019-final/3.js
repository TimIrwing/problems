const http = require('http');

const server = http
  .createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    const url = request.url;
    setTimeout(
      () => response.end(getImage(url), 'utf-8'),
      url === '/background' ? 2000 : 200
    );
  })
  .listen(3000);

function getImage(url) {
  return `
        <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
            <rect width="256" height="256" style="fill:${url === '/background'
              ? '#eee'
              : '#ddf'}" />
            <text xmlns="http://www.w3.org/2000/svg" x="50" y="50">${url}</text>
        </svg>
    `;
}
