/**
 * @swagger
 * /analytics/:
 *   get:
 *     summary: Analytics data based on current user's designation.
 *     tags: [/analytics]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: true
 *         description: Currently two barangays are allowed Lumil or Puting Kahoy
 *         default: Lumil
 *     responses:
 *       200:
 *         description: Sucessful response containing message, data, and payload.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Analytics data based on query year and month!
 *                payload:
 *                  type: array
 *                  example: [{ datetime: "2022 - January", category: "Mild", value: 10 }, { datetime: "2022 - February", category: "Moderate", value: 20 }, { datetime: "2022 - March", category: "Severe", value: 30 }]
 *       500:
 *         description: Unsucessful response due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Users is not defined
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 500
 *       undefined:
 *         description: Unsuccessful response due to server not responding.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to fetch. Check payload for possible reasons
 *                payload:
 *                  type: array
 *                  example: ["CORS", "Network Failure", "URL scheme must be 'http' or 'https' for CORS request."]
 */

/**
 * @swagger
 * /analytics/specific:
 *   get:
 *     summary: Analytics data based on current user's designation and month & year selected.
 *     tags: [/analytics]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: true
 *         description: Currently two barangays are allowed Lumil or Puting Kahoy
 *         default: Lumil
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: selected year
 *         default: 2022
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: selected month
 *         default: March
 *     responses:
 *       200:
 *         description: Sucessful response containing message, data, and payload.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Specific analytics data!
 *                payload:
 *                  type: object
 *                  properties:
 *                    severity:
 *                      type: array
 *                      example: [{ type: "Lagnat", value: 10 }, { type: "Ubo", value: 10 }, { type: "Sipon", value: 10 } ]
 *       500:
 *         description: Unsucessful response due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Users is not defined
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 500
 *       undefined:
 *         description: Unsuccessful response due to server not responding.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to fetch. Check payload for possible reasons
 *                payload:
 *                  type: array
 *                  example: ["CORS", "Network Failure", "URL scheme must be 'http' or 'https' for CORS request."]
 */

/**
 * @swagger
 * /analytics/specific-comments:
 *   get:
 *     summary: Analytics comments based on current user's designation and month & year selected.
 *     tags: [/analytics]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: true
 *         description: Currently two barangays are allowed Lumil or Puting Kahoy
 *         default: Lumil
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: selected year
 *         default: 2022
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: selected month
 *         default: March
 *     responses:
 *       200:
 *         description: Sucessful response containing message, data, and payload.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Specific comment data!
 *                payload:
 *                  type: array
 *                  example: [{ type: "Lagnat", value: 10 }, { type: "Ubo", value: 10 }, { type: "Sipon", value: 10 } ]
 *                comments:
 *                  type: array
 *                  example: [{ author: "fName lName", content: "this is a comment", datetime: "March 03,2022 1:00 PM", _id: "622d71bb5f0522e1bffa1dc6"}, { author: "fName lName", content: "this is a comment", datetime: "March 03,2022 1:00 PM", _id: "622d71bb5f0522e1bffa1dc6"}]
 *       500:
 *         description: Unsucessful response due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Users is not defined
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 500
 *       undefined:
 *         description: Unsuccessful response due to server not responding.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to fetch. Check payload for possible reasons
 *                payload:
 *                  type: array
 *                  example: ["CORS", "Network Failure", "URL scheme must be 'http' or 'https' for CORS request."]
 */

/**
 * @swagger
 * /analytics/add-comments:
 *   post:
 *     summary: Add comment based on current user's designation and month & year selected.
 *     tags: [/analytics]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: true
 *         description: Curreng user full name
 *         default: FName LName
 *       - in: query
 *         name: comment
 *         schema:
 *           type: string
 *         required: true
 *         description: Textbox input message
 *         default: This is a comment
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: true
 *         description: Currently two barangays are allowed Lumil or Puting Kahoy
 *         default: Lumil
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: selected year
 *         default: 2022
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: selected month
 *         default: March
 *     responses:
 *       200:
 *         description: Sucessful response containing message, data, and payload.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Comment has been added!
 *                payload:
 *                  $ref: '#/components/schemas/Analytic Comments'
 *       500:
 *         description: Unsucessful response due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Users is not defined
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 500
 *       undefined:
 *         description: Unsuccessful response due to server not responding.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to fetch. Check payload for possible reasons
 *                payload:
 *                  type: array
 *                  example: ["CORS", "Network Failure", "URL scheme must be 'http' or 'https' for CORS request."]
 */

/**
 * @swagger
 * /analytics/remove-comments:
 *   patch:
 *     summary: Remove comment based on current user's designation and month & year selected.
 *     tags: [/analytics]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: ObjectId
 *         required: true
 *         description: Comment mongodb uuid 
 *         default: 622d71bb5f0522e1bffa1dc6
 *     responses:
 *       200:
 *         description: Sucessful response containing message, data, and payload.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Comment has been deleted!
 *                payload:
 *                  $ref: '#/components/schemas/Analytic Comments'
 *       500:
 *         description: Unsucessful response due to an internal server error.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Users is not defined
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 500
 *       undefined:
 *         description: Unsuccessful response due to server not responding.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to fetch. Check payload for possible reasons
 *                payload:
 *                  type: array
 *                  example: ["CORS", "Network Failure", "URL scheme must be 'http' or 'https' for CORS request."]
 */