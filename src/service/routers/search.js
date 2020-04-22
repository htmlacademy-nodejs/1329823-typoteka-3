'use strict';

const fs = require(`fs`).promises;
const {MOCK_FILE_NAME} = require(`../../constants`);
const {Router} = require(`express`);
const searchRouter = new Router();
const logger = require(`../logger`).getLogger();

const getMockFile = async () => JSON.parse((await fs.readFile(MOCK_FILE_NAME)).toString());

searchRouter.get(`/`, async (req, res) =>{
  res.json((await getMockFile()).filter((el) =>
    el.title.match(new RegExp(req.query.query, `gi`))));
  logger.info(`Status code ${res.statusCode}`);
  return;
});

module.exports = searchRouter;
