import { Router } from "express";
import request from "request";
import authorize from "../../Services/oAuthGeneration.js";
const router = Router();

/**
 * @openapi
 * /api/oAuth/generateCodeUrl:
 *   post:
 *     tags:
 *       - Users oAuth
 *     summary: Generate URL to get the oAuth Code
 *     description: To raise the Admin consent pass "admin_consent" in prompt and "code" in responseType. Pass the Desired URI at redirectUri, if testing in local environment pass http://localhost. Next Step is copy the URL received in response and paste in the browser, microsoft login will pop up. Login with the desired account and pass the Consent. Once its successful copy the url in the browser and pass it in the authorization form element name "codeUrl"
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - redirectUri
 *               - prompt
 *               - responseType
 *             properties:
 *               clientId:
 *                 type: string
 *                 default: c9825c01-4934-4403-8468-87bd7aae6f57
 *               redirectUri:
 *                 type: string
 *                 default: http://localhost
 *               prompt:
 *                 type: string
 *                 default: admin_consent
 *               responseType:
 *                 type: string
 *                 default: code
 *     responses:
 *       '200':
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/generateCodeUrl", async (req, resp) => {
  var clientId = req.body.clientId;
  var redrectUri = encodeURI(req.body.redirectUri);

  var BASE_URL = "https://login.microsoftonline.com/common/oauth2/authorize?";
  var prompt = `prompt=${req.body.prompt}`;
  var resposeType = `&response_type=${req.body.responseType}`;

  resp.status(200).json({
    errorCode: 0,
    generatedUrl: BASE_URL.concat(prompt)
      .concat(resposeType)
      .concat("&redirect_uri=".concat(redrectUri))
      .concat("&client_id=".concat(clientId)),
  });
});

/**
 * @openapi
 * /api/oAuth/authorization:
 *   post:
 *     tags:
 *       - Users oAuth
 *     summary: User Authorization
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - clientSecret
 *               - codeUrl
 *               - redirectUri
 *               - grantType
 *               - resource
 *             properties:
 *               clientId:
 *                 type: string
 *                 default: c9825c01-4934-4403-8468-87bd7aae6f57
 *               clientSecret:
 *                 type: string
 *                 default: yk-0B9PT6h401qP.CVI3IXb0tZL~M_.Xij
 *               codeUrl:
 *                 type: string
 *               redirectUri:
 *                 type: string
 *                 default: http://localhost
 *               grantType:
 *                 type: string
 *                 default: authorization_code
 *               resource:
 *                 type: string
 *                 default: https://graph.microsoft.com
 *     responses:
 *       '200':
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/authorization", async (req, res) => {
  var parsedUrl = new URL(req.body.codeUrl);
  var CODE = parsedUrl.searchParams.get("code");

  res.status(200).json({
    errorCode: 0,
    message: "successful communication",
    clientId: req.body.clientId,
    code: CODE,
    value:
      JSON.stringify(
        authorize(
          CODE,
          req.body.clientId,
          req.body.clientSecret,
          req.body.redirectUri,
          req.body.grantType,
          req.body.resource
        )
      ) || "no body generated",
  });
});

export default router;
