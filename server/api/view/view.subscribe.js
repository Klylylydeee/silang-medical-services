

/**
 * @swagger
 * /subscription/:
 *   post:
 *     summary: Add citizen to subscription listing
 *     tags: [/subscription]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 default: Juan
 *               last_name:
 *                 type: string
 *                 default: Mendoza
 *               email:
 *                 type: string
 *                 default: juan_mendoza@gmail.com
 *               phone_number:
 *                 type: number
 *                 default: 639476303740
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 default: Juan
 *               last_name:
 *                 type: string
 *                 default: Mendoza
 *               email:
 *                 type: string
 *                 default: juan_mendoza@gmail.com
 *               phone_number:
 *                 type: number
 *                 default: 639476303740
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *                 enum: [ "Lumil", "Puting Kahoy"]
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
 *                  default: You have been added to the Subscription list.
 *                payload:
 *                  type: object
 *                  properties:
 *                    first_name:
 *                      type: string
 *                      default: Juan
 *                    last_name:
 *                      type: string
 *                      default: Mendoza
 *                    email:
 *                      type: string
 *                      default: juan_mendoza@gmail.com
 *                    phone_number:
 *                      type: number
 *                      default: 639476305740
 *                    barangay:
 *                      type: string
 *                      default: Lumil
 *                    status:
 *                      type: boolean
 *                      default: false
 *                    _id:
 *                      type: string
 *                      default: 61fb44519214833c413ccd48
 *                    createdAt:
 *                      type: string
 *                      default: 2022-02-03T02:56:17.000Z
 *                    updatedAt:
 *                      type: string
 *                      default: 2022-02-03T02:56:17.000Z
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
 *         description: Unsuccessful and error is server did not respond with the HTTP request.
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
 * /subscription/listing:
 *   get:
 *     summary: Add citizen to subscription listing
 *     tags: [/subscription]
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
 *                  default: Subscription Listing.
 *                payload:
 *                  type: array
 *                  example: [{ $ref: '#/components/schemas/Subscribed Citizen' }]
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
 *         description: Unsuccessful and error is server did not respond with the HTTP request.
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