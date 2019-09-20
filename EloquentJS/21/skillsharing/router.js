let { parse } = require('url');

module.exports = class Router {
    constructor() {
        this.routes = [];
    }
    add(method, url, handler) {
        this.routes.push({ method, url, handler });
    }
    resolve(context, request) {
        const path = parse(request.url).pathname;

        for (const { method, url, handler } of this.routes) {
            const match = url.exec(path);
            if (!match || request.method != method) continue;
            const urlParts = match.slice(1).map(decodeURIComponent);
            return handler(context, ...urlParts, request);
        }
        return null;
    }
};
