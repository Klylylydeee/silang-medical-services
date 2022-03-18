/**
 * @swagger
 * /communication/listing/{barangay}:
 *   get:
 *     summary: Analytics data based on current user's designation.
 *     tags: [/communication]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: path
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
 *                  default: Announcements listing!
 *                payload:
 *                  type: array
 *                  example: [ { "_id": "6231ee54ef120fdb3e447718", "announcement": "libreng tuli ulit", "message": "hahaha", "barangay": "Lumil", "requestor": { "first_name": "Klyde", "last_name": "Guevarra cm", "email": "klylylydeee@gmail.com", "phone_number": "639476303740", "_id": "6231ee54ef120fdb3e447719" }, "subscribed": [ { "first_name": "klyde", "last_name": "guevarra", "email": "klylylydeee@gmail.com", "phone_number": "639476303740", "status": "Queued", "_id": "6231ee54ef120fdb3e44771a" }, { "first_name": "tester", "last_name": "tester", "email": "tester@gmail.com", "phone_number": "639476303745", "status": "Queued", "_id": "6231ee54ef120fdb3e44771b" } ], "announcement_datetime": "2022-03-16 22:04:04", "status": true, "createdAt": "2022-03-16T14:04:04.000Z", "updatedAt": "2022-03-16T14:04:04.000Z", "__v": 0 } ]
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
 * /communication/create:
 *   post:
 *     summary: Analytics data based on current user's designation and month & year selected.
 *     tags: [/communication]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               announcement:
 *                 type: string
 *                 default: Juan
 *               message:
 *                 type: string
 *                 default: Mendoza
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *               requestor:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   last_name:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   email:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   phone_number:
 *                     type: number
 *                     default: 639476303740@gmail.com
 *               announcement_datetime:
 *                 type: string
 *                 default: javascript date
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               announcement:
 *                 type: string
 *                 default: Juan
 *               message:
 *                 type: string
 *                 default: Mendoza
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *                 enum: [ "Lumil", "Puting Kahoy"]
 *               requestor:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   last_name:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   email:
 *                     type: string
 *                     default: juan_mendoza@gmail.com
 *                   phone_number:
 *                     type: number
 *                     default: 639476303740@gmail.com
 *               announcement_datetime:
 *                 type: string
 *                 default: javascript date
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
 *                  default: Announcement has been made!
 *                payload:
 *                  type: object
 *                  $ref: '#/components/schemas/Announcements'
 *                      
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