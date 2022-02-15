
/**
 * @swagger
 * components:
 *   schemas:
 *     Error Logs:
 *       type: object
 *       required:
 *         - timestamp
 *         - level
 *         - message
 *         - meta
 *       properties:
 *         _id:
 *           type: string
 *           description: _id
 *         timestamp:
 *           type: datetime
 *           description: timestamp
 *         level:
 *           type: string
 *           description: level
 *         meta:
 *           type: object
 *           properties:
 *             status:
 *               type: String
 *               description: status
 *             stack:
 *               type: String
 *               description: stack
 * 
 */