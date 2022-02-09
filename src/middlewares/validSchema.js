import joi from'joi';

export default function validSchema(schema){
  return function(req, res, next) {
      const validation = schema.validate(req.body);

      if (validation.error) {
        return res.sendStatus(422);
      }
    next();
  }
}