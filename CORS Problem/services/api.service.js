"use strict";

const http = require("moleculer-web");

const authenticationRoutes = {
	"POST login": "greeter.hello"
};

module.exports = {
	name: "API Gateway",
	mixins: [http],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 8002,

		rateLimit: {
			// How long to keep record of requests in memory (in milliseconds).
			// Defaults to 60000 (1 min)
			window: 60 * 1000,

			// Max number of requests during window. Defaults to 30
			limit: 30,

			// Set rate limit headers to response. Defaults to false
			headers: true,

			// Function used to generate keys. Defaults to:
			key: (req) => {
				return req.headers["x-forwarded-for"] ||
					req.connection.remoteAddress ||
					req.socket.remoteAddress ||
					req.connection.socket.remoteAddress;
			},
			//StoreFactory: CustomStore
		},

		routes: [{
			authorization: true,
			path: "/v1/api",
			whitelist: [
				// Access to any actions in all services under "/api" URL
				"**"
			],
			aliases: {
				...authenticationRoutes
			},
			// Global CORS settings for all routes
			cors: {
				// Configures the Access-Control-Allow-Origin CORS header.
				origin: "*",
				// Configures the Access-Control-Allow-Methods CORS header.
				methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
				// Configures the Access-Control-Allow-Headers CORS header.
				allowedHeaders: [],
				// Configures the Access-Control-Expose-Headers CORS header.
				exposedHeaders: [],
				// Configures the Access-Control-Allow-Credentials CORS header.
				credentials: false,
				// Configures the Access-Control-Max-Age CORS header.
				maxAge: 3600
			}
		}]
	}
};
