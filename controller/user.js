'user strict';
const Joi = require('@hapi/joi');

const userService = require('../service/user');
const logger = require('../util/logger');

exports.authenticateUser = async (req,res) => {
  logger.debug("user controller : authenticateUser : start");

  try{
    let body = req.body;
    logger.debug("user controller : authenticateUser : Input Validation");
    const errorMessage = await authInputValidation(body);
    if(errorMessage){
      res.status(400);
      res.json(errorMessage);
    }
    else{
      userService.authenticateUser(body, res);
    }
    
    logger.debug("user controller : authenticateUser :end");
  }
  catch(error){
    logger.error("user controller : authenticateUser: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

let authInputValidation = async (body) =>{
  const schema = Joi.object({
    authUserId: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().required()
  });

  const result = await schema.validate(body);
  if(result.error){
    logger.error("user controller : authenticateUser : Input Validation error %o",result.error);
    return {
      code:"input_data_issue",
      message: result.error.details[0].message.split('\"').join("")
    };
  }
  else{
    logger.info("user controller : authenticateUser : Input Validation success");
    return false;
  }
}

exports.listUser = async (req,res) => {
  try{
    logger.debug("user controller : listUser : start");
    userService.listUser(res);
    logger.debug("user controller : listUser :end");
  }
  catch(error){
    logger.error("user controller : listUser: catch %o",error);
    res.status(500);
    res.json({
      code:"internal_error",
      message: "Server encountered an error, Please try again after some time"
    });
  }
}

module.exports.authInputValidation = authInputValidation;