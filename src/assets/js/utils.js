export default class ApplicationHelper {
  static failed = []

  static getAutheData = () => {
    return localStorage && localStorage.getItem('authenData')
      ? JSON.parse(localStorage.getItem('authenData'))
      : null
  }

  static setAuthenData = (activeStatus, data) => {
    if (data && activeStatus) {
      localStorage.setItem('activeStatus', true)
      localStorage.setItem('authenData', data)
    } else {
      localStorage.setItem('activeStatus', false)
      localStorage.setItem('authenData', '')
    }
  }

  static getCurrentUserData = () => {
    return {
      role: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().role
        : null,
      refreshExpiration: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().refresh
          ? ApplicationHelper.getAutheData().refresh.expirtaion
          : null
        : null,
      refreshToken: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().refresh
          ? ApplicationHelper.getAutheData().refresh.token
          : null
        : null,
      token: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().token
        : null,
      permissions: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().permissions
        : null,
      fullName: ApplicationHelper.getAutheData()
        ? ApplicationHelper.getAutheData().fullName
        : null,
    }
  }

  static removeToken = () => {
    ApplicationHelper.setAuthenData(
      'false',
      JSON.stringify({
        permissions: '',
        role: '',
        fullName: '',
        token: '',
        refresh: '',
      })
    )
  }

  static checkPermission = (type) => {
    if (typeof tpye === 'boolean') {
      return type
    }
    const authenData = ApplicationHelper.getAutheData()
    if (authenData && authenData.role.role === 'Superuser') {
      return true
    }

    const { permissions } = ApplicationHelper.getCurrentUserData()
    if (
      permissions !== null &&
      permissions !== undefined &&
      (type.indexOf('_VIEW') || type.indexOf('_EDIT'))
    ) {
      return permissions.indexOf(type) > -1
    }
  }

  static checkPermissionByAssetStatus = (type, assetStatus) => {
    switch (assetStatus) {
      case 'Verified': {
        if (type === 'edit') {
          return ApplicationHelper.checkPermission('VERIFIED_ASSETS_EDIT')
        } else if (type === 'view') {
          return ApplicationHelper.checkPermission('VERIFIED_ASSETS_VIEW')
        }
        break
      }
      case 'Classified': {
        if (type === 'edit') {
          return (
            ApplicationHelper.checkPermission('CLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('VERIFIED_ASSETS_EDIT')
          )
        } else if (type === 'view') {
          return ApplicationHelper.checkPermission('CLASSIFIED_ASSETS_VIEW')
        }
        break
      }
      case 'Preclassified': {
        if (type === 'edit') {
          return (
            ApplicationHelper.checkPermission('PRECLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('CLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('VERIFIED_ASSETS_EDIT')
          )
        } else if (type === 'view') {
          return ApplicationHelper.checkPermission('PRECLASSIFIED_ASSETS_VIEW')
        }
        break
      }
      case 'Unclassified': {
        if (type === 'edit') {
          return (
            ApplicationHelper.checkPermission('UNCLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('PRECLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('CLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('VERIFIED_ASSETS_EDIT')
          )
        } else if (type === 'view') {
          return ApplicationHelper.checkPermission('UNCLASSIFIED_ASSETS_VIEW')
        }
        break
      }
      case 'Draft': {
        if (type === 'edit') {
          return (
            ApplicationHelper.checkPermission('UNCLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('PRECLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('CLASSIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('VERIFIED_ASSETS_EDIT') ||
            ApplicationHelper.checkPermission('DRAFTS_EDIT')
          )
        } else if (type === 'view') {
          return ApplicationHelper.checkPermission('DRAFTS_VIEW')
        }
        break
      }
      default:
        return
    }
  }

  static getPropperSelectOptions = (type, options) => {
    const newOptions = options.filter((option) =>
      ApplicationHelper.checkPermissionByAssetStatus(type, option.value)
    )
    return newOptions
  }

  static compouseDescription = (filterDescription) => {
    if (filterDescription.length === 0) return null
    return filterDescription.reduce((acc, cur, ind, arr) => {
      const itemDescription = `${cur.label}: ${cur.helpText}${
        ind !== arr.length - 1 ? '\n\n' : ''
      }`
      return acc + itemDescription
    }, '')
  }

  static validateUrl = (url) => {
    return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
      url
    )
  }

  static validateEmail = (email) => {
    return /(?:[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
      email
    )
  }
}
