var ipMiddleware = (req, res, next) => {
	const ip = requestIp.getClientIp(req);
	console.log(ip);
	next();
}

module.exports = ipMiddleware;