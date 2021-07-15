export const PRECLASSIFIED_ASSETS_VIEW = 'PRECLASSIFIED_ASSETS_VIEW'
export const PRECLASSIFIED_ASSETS_EDIT = 'PRECLASSIFIED_ASSETS_EDIT'
export const UNCLASSIFIED_ASSETS_VIEW = 'UNCLASSIFIED_ASSETS_VIEW'
export const UNCLASSIFIED_ASSETS_EDIT = 'UNCLASSIFIED_ASSETS_EDIT'
export const CLASSIFIED_ASSETS_VIEW = 'CLASSIFIED_ASSETS_VIEW'
export const CLASSIFIED_ASSETS_EDIT = 'CLASSIFIED_ASSETS_EDIT'
export const VERIFIED_ASSETS_VIEW = 'VERIFIED_ASSETS_VIEW'
export const VERIFIED_ASSETS_EDIT = 'VERIFIED_ASSETS_EDIT'
export const ALL_USERS_VIEW = 'ALL_USERS_VIEW'
export const ALL_USERS_EDIT = 'All_USERS_EDIT'
export const ROLE_PERMISSIONS_VIEW = 'ROLE_PERMISSIONS_VIEW'
export const ROLE_PERMISSIONS_EDIT = 'ROLE_PERMISSIONS_EDIT'
export const ORGANIZATIONS_VIEW = 'ORGANIZATIONS_VIEW'
export const ORGANIZATIONS_EDIT = 'ORGANIZATIONS_EDIT'
export const DRAFTS_VIEW = 'DRAFTS_VIEW'
export const DRAFTS_EDIT = 'DRAFTS_EDIT'

export const permissions = [
  {
    label: 'Draft Assets/Activities',
    viewValue: DRAFTS_VIEW,
    editValue: DRAFTS_EDIT,
  },
  {
    label: 'Submitted Assets/Activities',
    viewValue: UNCLASSIFIED_ASSETS_VIEW,
    editValue: UNCLASSIFIED_ASSETS_EDIT,
  },
  {
    label: 'Preclassified Assets/Activities',
    viewValue: PRECLASSIFIED_ASSETS_VIEW,
    editValue: PRECLASSIFIED_ASSETS_EDIT,
  },
  {
    label: 'Classified Assets/Activities',
    viewValue: CLASSIFIED_ASSETS_VIEW,
    editValue: CLASSIFIED_ASSETS_EDIT,
  },
  {
    label: 'Published Assets/Activities',
    viewValue: VERIFIED_ASSETS_VIEW,
    editValue: VERIFIED_ASSETS_EDIT,
  },
  {
    label: 'Users',
    viewValue: ALL_USERS_VIEW,
    editValue: ALL_USERS_EDIT,
  },
  {
    label: 'Roles',
    viewValue: ROLE_PERMISSIONS_VIEW,
    editValue: ROLE_PERMISSIONS_EDIT,
  },
  {
    label: 'Organizations',
    viewValue: ORGANIZATIONS_VIEW,
    editValue: ORGANIZATIONS_EDIT,
  },
]
