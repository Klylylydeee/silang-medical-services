/**
 * @swagger
 * /dashboard/default:
 *   get:
 *     summary: Confirmation of change password from request of lost password.
 *     tags: [/dashboard]
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
 *                  default: Default dashboard data!
 *                payload:
 *                  type: object
 *                  properties:
 *                    table:
 *                      type: array
 *                      example: [{ title: Barangay Users, data: [] }, { title: Registered Citizens, data: [] }, { title: Medical Recrods, data: [] }, { title: Event Listing, data: [] }, { title: Announcements, data: [] }, { title: Analytics Comments, data: [] }]
 *                    events:
 *                      type: array
 *                      example: [{ event: eventName, etc: etc}]
 *                    announcements:
 *                      type: array
 *                      example: [{ announcements: announcements, etc: etc}]
 *                    records:
 *                      type: array
 *                      example: [{ records: announcements, etc: etc}]
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
 * /dashboard/chairman:
 *   get:
 *     summary: Confirmation of change password from request of lost password.
 *     tags: [/dashboard]
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
 *                  default: Default dashboard data!
 *                payload:
 *                  type: object
 *                  properties:
 *                    table:
 *                      type: array
 *                      example: [{ title: Barangay Users, data: [] }, { title: Registered Citizens, data: [] }, { title: Medical Recrods, data: [] }, { title: Event Listing, data: [] }, { title: Announcements, data: [] }, { title: Analytics Comments, data: [] }]
 *                    events:
 *                      type: array
 *                      example: [{ event: eventName, etc: etc}]
 *                    announcements:
 *                      type: array
 *                      example: [{ announcements: announcements, etc: etc}]
 *                    records:
 *                      type: array
 *                      example: [{ records: announcements, etc: etc}]
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
 * /dashboard/staff:
 *   get:
 *     summary: Confirmation of change password from request of lost password.
 *     tags: [/dashboard]
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
 *                  default: Default dashboard data!
 *                payload:
 *                  type: object
 *                  properties:
 *                    table:
 *                      type: array
 *                      example: [{ title: Barangay Users, data: [] }, { title: Registered Citizens, data: [] }, { title: Medical Recrods, data: [] }, { title: Event Listing, data: [] }, { title: Announcements, data: [] }, { title: Analytics Comments, data: [] }]
 *                    events:
 *                      type: array
 *                      example: [{ event: eventName, etc: etc}]
 *                    announcements:
 *                      type: array
 *                      example: [{ announcements: announcements, etc: etc}]
 *                    records:
 *                      type: array
 *                      example: [{ records: announcements, etc: etc}]
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
 * /dashboard/nurse:
 *   get:
 *     summary: Confirmation of change password from request of lost password.
 *     tags: [/dashboard]
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
 *                  default: Default dashboard data!
 *                payload:
 *                  type: object
 *                  properties:
 *                    table:
 *                      type: array
 *                      example: [{ title: Barangay Users, data: [] }, { title: Registered Citizens, data: [] }, { title: Medical Recrods, data: [] }, { title: Event Listing, data: [] }, { title: Announcements, data: [] }, { title: Analytics Comments, data: [] }]
 *                    events:
 *                      type: array
 *                      example: [{ event: eventName, etc: etc}]
 *                    announcements:
 *                      type: array
 *                      example: [{ announcements: announcements, etc: etc}]
 *                    records:
 *                      type: array
 *                      example: [{ records: announcements, etc: etc}]
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