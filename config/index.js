import Joi from 'joi';

// get env params
require('dotenv').config();

const envVarsSchema = Joi.object({
    JWT_SECRET: Joi.string().required()
      .description('JWT Secret required to sign'),
  }).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    jwtSecret: envVars.JWT_SECRET,
  };
  
export default config;
  