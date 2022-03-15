/**
 * @swagger
 * /medical-record/private/officer:
 *   get:
 *     summary: Fetch all medical records of a specific barangay.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: false
 *         description: Currently two barangays are allowed Lumil or Puting Kahoy
 *         default: Lumil
 *       - in: query
 *         name: designation
 *         schema:
 *           type: string
 *         required: false
 *         description: If designation is added, please remove the barangay parameter
 *         default: Doctor
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
 *                  default: Medical Record for barangay!
 *                payload:
 *                  type: array
 *                  example: [{ $ref: '#/components/schemas/Medical Records' }]
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
 * /medical-record/private/medical:
 *   get:
 *     summary: Fetch all medical records (Only allowed for designation with Doctor on the client side).
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
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
 *                  default: Medical Records!
 *                payload:
 *                  type: array
 *                  example: [{ $ref: '#/components/schemas/Medical Records' }]
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
 * /medical-record/private/medical-record:
 *   get:
 *     summary: Fetch single medical records.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: Medical Record MongoDB UUID
 *         default: 1f20c04deF55011
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
 *                  default: Medical Record related to your query!
 *                payload:
 *                  type: object
 *                  $ref: '#/components/schemas/Medical Records'
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
 *       501:
 *         description: Medical record does not exists.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Medical Record does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 501
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
 * /medical-record/private/create:
 *   post:
 *     summary: Create new medical record under a specific barangay.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
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
 *                  default: Medical Record has been created!
 *                payload:
 *                  type: object
 *                  $ref: '#/components/schemas/Medical Records'
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
 * /medical-record/private/select-record:
 *   post:
 *     summary: Fetch single medical record using uuid body and query barangay.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - in: query
 *         name: barangay
 *         schema:
 *           type: string
 *         required: false
 *         description: Lumil or Puting Kahoy
 *         default: Lumil
*     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: ObjectID
 *                 default: 123456789
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: ObjectID
 *                 default: 123456789
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
 *                  default: Medical Record related to your query!
 *                payload:
 *                  type: object
 *                  $ref: '#/components/schemas/Medical Records'
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
 *       501:
 *         description: Medical record does not exists.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Medical Record does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 501
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
 * /medical-record/private/generate-record-list:
 *   patch:
 *     summary: Fetch medical records based on email and barangay.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
*     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *               barangay:
 *                 type: string
 *                 default: Lumil
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
 *                  default: Medical Record has been updated!
 *                payload:
 *                  type: array
 *                  example: [{$ref: '#/components/schemas/Medical Records'}]
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
 *       501:
 *         description: Medical record does not exists.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Medical Record does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 501
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
 * /medical-record/private/update-record:
 *   patch:
 *     summary: Update a single medical record using uuid.
 *     tags: [/medical-record]
 *     security:
 *      - Authorization: []
*     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: ObjectID
 *                 default: 123456789
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: ObjectID
 *                 default: 123456789
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
 *                  default: Medical Record has been updated!
 *                payload:
 *                  type: object
 *                  $ref: '#/components/schemas/Medical Records'
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
 *       501:
 *         description: Medical record does not exists.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Medical Record does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: ReferenceError Users is not defined at exports.userSignIn (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:41:24) at Layer.handle [as handle_request] (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\layer.js:95:5) at next (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express\\lib\\router\\route.js:137:13) at middleware (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\node_modules\\express-validator\\src\\middlewares\\check.js:16:13) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 501
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