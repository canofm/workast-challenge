import {
  SCHEMA_VALIDATOR_EXCEPTION,
  MONGO_EXCEPTION,
  DUPLICATED_KEY_ERROR_CODE,
  SchemaValidationException,
  DuplicatedEntityException
} from "../exceptions";

export default (error, doc, next) => {
  switch (error.name) {
    case SCHEMA_VALIDATOR_EXCEPTION:
      next(new SchemaValidationException(error.message));
      break;
    case MONGO_EXCEPTION:
      if (error.code === DUPLICATED_KEY_ERROR_CODE) {
        next(new DuplicatedEntityException(error.errmsg));
      }
      next(error);
      break;
    default:
      next(error);
      break;
  }
};
