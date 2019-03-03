class Mapper {
  toModel(entity) {
    throw new Error("must implement this method");
  }
  toDomain(model) {
    throw new Error("must implement this method");
  }
}

export default Mapper;
