export {
  TagSourceObject,
  TagSourceIdFieldObject,
  TagSourceNameFieldObject,
  TagSourceTypeFieldObject,
  TagSourceCompanyFieldObject,
  TagSourceCompanyIdFieldObject,
  TagSourceOfferTagsFieldObject,
  TagSourceCandidateReferrerFieldObject,
  TagSourceCandidateTagsFieldObject
} from './object.base';
export {
  createManyTagSourceMutation,
  createOneTagSourceMutation,
  deleteManyTagSourceMutation,
  deleteOneTagSourceMutation,
  updateManyTagSourceMutation,
  updateOneTagSourceMutation,
  upsertOneTagSourceMutation,
  createManyTagSourceMutationObject,
  createOneTagSourceMutationObject,
  deleteManyTagSourceMutationObject,
  deleteOneTagSourceMutationObject,
  updateManyTagSourceMutationObject,
  updateOneTagSourceMutationObject,
  upsertOneTagSourceMutationObject
} from './mutations';
export {
  findFirstTagSourceQuery,
  findManyTagSourceQuery,
  countTagSourceQuery,
  findUniqueTagSourceQuery,
  findFirstTagSourceQueryObject,
  findManyTagSourceQueryObject,
  countTagSourceQueryObject,
  findUniqueTagSourceQueryObject
} from './queries';
