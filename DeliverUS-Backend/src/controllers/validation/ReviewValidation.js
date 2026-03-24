import { check } from 'express-validator'

const create = [
    check('stars').exists().isInt({ min: 0, max: 5 }),
    check('body').optional({nullable: true, checkFalsy: true}).isString().isLength({min: 1, max: 255 }).trim()
]
const update = [
    check('stars').exists().isInt({ min: 0, max: 5 }),
    check('body').optional({nullable: true, checkFalsy: true}).isString().isLength({min: 1, max: 255 }).trim()
]

export { create, update }
