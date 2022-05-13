const { createNodeMiddleware, createProbot, Context } = require("probot");

const triage = require("../");
const probot = createProbot();
const triageMiddleware = createNodeMiddleware(triage, { probot });

/**
 * Redirect `GET /` to `/stats`, pass `POST /` to Probot's middleware
 *
 * @param {import('@vercel/node').NowRequest} request
 * @param {import('@vercel/node').NowResponse} response
 */
module.exports = (request, response) => {
  if (request.method !== "POST") {
    console.log('REDIRECT from ', request.url);
    response.writeHead(302, {
      Location: "/stats",
    });
    response.end();
    return;
  }

  triageMiddleware(request, response);
};
