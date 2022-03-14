/**
 * @swagger
 * /settings/user-list:
 *   get:
 *     summary: Confirmation of change password from request of lost password.
 *     tags: [/settings]
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
 *                  default: User list for barangay!
 *                payload:
 *                  type: array
 *                  example: [{ _id: "622d71bb5f0522e1bffa1dc6", first_name: "FName", last_name: "LName", email: "email@gmail.com", phone_number: "639476303777", barangay: "Lumil", designation: "Staff", status: true, createdAt: "2022-03-13T04:23:23.000+00:00", updatedAt: "2022-03-13T04:23:23.000+00:00"},{ _id: "622d71bb5f0522e1bffa1dc6", first_name: "FName", last_name: "LName", email: "email@gmail.com", phone_number: "639476303777", barangay: "Lumil", designation: "Staff", status: true, createdAt: "2022-03-13T04:23:23.000+00:00", updatedAt: "2022-03-13T04:23:23.000+00:00"}]
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
 * /settings/user-invitation:
 *   get:
 *     summary: Create new user account through private invitation by a staff/chairman user.
 *     tags: [/settings]
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
 *               designation:
 *                 type: string
 *                 default: Chairman
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
 *               designation:
 *                 type: string
 *                 default: Chairman
 *                 enum: [ "Chairman", "Staff", "Doctor", "Nurse"]
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
 *                  default: Account has been created.
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
 *                    password:
 *                      type: string
 *                      default: $2b$05$9ScpeFHTCSIg1z09niPiuOK.bN08ZTjn3YN8odyCwxXWAHy9c88JW
 *                    phone_number:
 *                      type: number
 *                      default: 639476305740
 *                    barangay:
 *                      type: string
 *                      default: Lumil
 *                    designation:
 *                      type: string
 *                      default: Chairman
 *                    pin:
 *                      type: number
 *                      default: 123456
 *                    pin_threshold:
 *                      type: number
 *                      default: 3
 *                    language:
 *                      type: string
 *                      default: en
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
 *       405A:
 *         description: Existing unique properties
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email is already existing
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405B:
 *         description: Missing properties
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Missing parameters Email, Phone Number and Language.
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405C:
 *         description: Minimum password length not met
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Password does not satisfy the minimum requirement string length
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405D:
 *         description: Designation value does not exists in the enum values
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Designation does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405E:
 *         description: Barangay value does not exists in the enum values
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Barangay does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405F:
 *         description: Email does not satisfy the criteria
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email is not a valid email
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405G:
 *         description: Phone Number does not satisfy the criteria
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Wrong phone number format
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
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
 * /settings/user-data:
 *   post:
 *     summary: Retrieve a specific user data.
 *     tags: [/settings]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
 *                 required: false
 *               email:
 *                 type: string
 *                 default: email@gmail.com
 *                 required: false
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *                 required: false
*       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
 *                 required: false
 *               email:
 *                 type: string
 *                 default: juan_mendoza@gmail.com
 *                 required: false
 *               barangay:
 *                 type: string
 *                 default: Lumil
 *                 enum: [ "Lumil", "Puting Kahoy"]
 *                 required: false
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
 *                  default: User list for barangay!
 *                payload:
 *                  type: array
 *                  example: [{ _id: "622d71bb5f0522e1bffa1dc6", first_name: "FName", last_name: "LName", email: "email@gmail.com", phone_number: "639476303777", barangay: "Lumil", designation: "Staff", status: true, createdAt: "2022-03-13T04:23:23.000+00:00", updatedAt: "2022-03-13T04:23:23.000+00:00"},{ _id: "622d71bb5f0522e1bffa1dc6", first_name: "FName", last_name: "LName", email: "email@gmail.com", phone_number: "639476303777", barangay: "Lumil", designation: "Staff", status: true, createdAt: "2022-03-13T04:23:23.000+00:00", updatedAt: "2022-03-13T04:23:23.000+00:00"}]
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
 *       500A:
 *         description: User does not exists
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email does not exists.
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
 * /settings/user-status:
 *   post:
 *     summary: Request a specific user to receive a lost password confirmation.
 *     tags: [/settings]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
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
 *               _id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
 *               email:
 *                 type: string
 *                 default: juan_mendoza@gmail.com
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
 *                  default: User has been re-actived or deactivated
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
 *       500A:
 *         description: User does not exists
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email does not exists.
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
 * /settings/user-pass-request:
 *   post:
 *     summary: Request a specific user to receive a lost password confirmation.
 *     tags: [/settings]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
*       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 default: 622d71bb5f0522e1bffa1dc6
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
 *                  default: Password reset request has been sent
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
 *       500A:
 *         description: User does not exists
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email does not exists.
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
 * /settings/user-setting:
 *   post:
 *     summary: Update user account.
 *     tags: [/settings]
 *     security:
 *      - Authorization: []
 *     requestBody:
 *      content:
 *       application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: id
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
 *               designation:
 *                 type: string
 *                 default: Chairman
 *       multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 default: id
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
 *               designation:
 *                 type: string
 *                 default: Chairman
 *                 enum: [ "Chairman", "Staff", "Doctor", "Nurse"]
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
 *                  default: User setting has been changed!
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
 *                    password:
 *                      type: string
 *                      default: $2b$05$9ScpeFHTCSIg1z09niPiuOK.bN08ZTjn3YN8odyCwxXWAHy9c88JW
 *                    phone_number:
 *                      type: number
 *                      default: 639476305740
 *                    barangay:
 *                      type: string
 *                      default: Lumil
 *                    designation:
 *                      type: string
 *                      default: Chairman
 *                    pin:
 *                      type: number
 *                      default: 123456
 *                    pin_threshold:
 *                      type: number
 *                      default: 3
 *                    language:
 *                      type: string
 *                      default: en
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
 *       405A:
 *         description: Existing unique properties
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email is already existing
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405B:
 *         description: Missing properties
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Missing parameters Email, Phone Number and Language.
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405C:
 *         description: Minimum password length not met
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Password does not satisfy the minimum requirement string length
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405D:
 *         description: Designation value does not exists in the enum values
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Designation does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405E:
 *         description: Barangay value does not exists in the enum values
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Barangay does not exists
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405F:
 *         description: Email does not satisfy the criteria
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Email is not a valid email
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
 *       405G:
 *         description: Phone Number does not satisfy the criteria
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: Wrong phone number format
 *                metadata:
 *                  type: object
 *                  properties:
 *                    stack: 
 *                      type: string   
 *                      default: Error Users schema (C:\\Users\\klyly\\Desktop\\silang-medical-services\\server\\api\\controller\\cont.authentication.js:45:25) at processTicksAndRejections (internal/process/task_queues.js:95:5)
 *                    status: 
 *                      type: number   
 *                      default: 405
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