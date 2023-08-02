export {
  DepartmentObject,
  DepartmentIdFieldObject,
  DepartmentNameFieldObject,
  DepartmentCompanyFieldObject,
  DepartmentCompanyIdFieldObject,
  DepartmentOffersFieldObject,
} from './object.base'
export {
  createManyDepartmentMutation,
  createOneDepartmentMutation,
  deleteManyDepartmentMutation,
  deleteOneDepartmentMutation,
  updateManyDepartmentMutation,
  updateOneDepartmentMutation,
  upsertOneDepartmentMutation,
  createManyDepartmentMutationObject,
  createOneDepartmentMutationObject,
  deleteManyDepartmentMutationObject,
  deleteOneDepartmentMutationObject,
  updateManyDepartmentMutationObject,
  updateOneDepartmentMutationObject,
  upsertOneDepartmentMutationObject,
} from './mutations'
export {
  findFirstDepartmentQuery,
  findManyDepartmentQuery,
  countDepartmentQuery,
  findUniqueDepartmentQuery,
  findFirstDepartmentQueryObject,
  findManyDepartmentQueryObject,
  countDepartmentQueryObject,
  findUniqueDepartmentQueryObject,
} from './queries'
