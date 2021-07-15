import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const SET_ARTICLE_REQUEST = 'SET_ARTICLE_REQUEST'
export const SET_ARTICLE_CREATE_SUCCESS = 'SET_ARTICLE_CREATE_SUCCESS'
export const SET_ARTICLE_UPDATE_SUCCESS = 'SET_ARTICLE_UPDATE_SUCCESS'
export const SET_STATUS_UPDATE_SUCCESS = 'SET_STATUS_UPDATE_SUCCESS'
export const SET_ARTICLE_DELETE_SUCCESS = 'SET_ARTICLE_DELETE_SUCCESS'
export const SET_URL_ERROR = 'SET_URL_ERROR'
export const SET_ORGANIZATION_ERROR = 'SET_ORGANIZATION_ERROR'
export const SET_PROCESSED_ARTICLE_ID = 'SET_PROCESSED_ARTICLE_ID'
export const SET_ALL_COUNT = 'SET_ALL_COUNT'

export const setArticleRequest = () => ({
  type: SET_ARTICLE_REQUEST,
})

const setAllCount = (number) => ({
  type: SET_ALL_COUNT,
  number,
})

const setArticleCreateSuccess = () => ({
  type: SET_ARTICLE_CREATE_SUCCESS,
})

const setArticleUpdateSuccess = () => ({
  type: SET_ARTICLE_UPDATE_SUCCESS,
})

const setProcessedArticleId = (id) => ({
  type: SET_PROCESSED_ARTICLE_ID,
  id: id,
})

const generateArticleData = (article, curators, organization) => {
  let data = {
    data: {
      name: article.name,
      url: article.url,
      description: article.description,
      publication_type: article.publication_type.label,
      language: article.language.label,
      asset_version: article.asset_version,
      asset_maturity: article.asset_maturity.label,
      keywords: article.keywords
        ? article.keywords.map((word) => word.label)
        : [],
      ref: article.ref,
      notes: article.notes,
      role: article.role.map((item) => item.value),
      formalism: article.formalism.map((item) => item.value),
      geography: article.geography,
      status: article.status.value,
      categories: [
        ...article.assetType.map((item) => item.value),
        ...article.subject.map((item) => item.value),
        ...article.setting.map((item) => item.value),
        ...article.process.map((item) => item.value),
      ],
      author: { id: article.author.id },
    },
    organization: organization,
    curators: curators,
    keywords: article.keywords
      ? article.keywords.map((keyword) => {
          return {
            keyword: keyword.value,
          }
        })
      : [],
    geography: {
      countries: article.countries
        ? article.countries.map((country) => {
            return {
              country: country.value,
            }
          })
        : [],
      panCountries: article.pan_countries
        ? article.pan_countries.map((panCountry) => {
            return {
              panCountry: panCountry.value,
            }
          })
        : [],
      regions: article.regions
        ? article.regions.map((region) => {
            return {
              region: region.value,
            }
          })
        : [],
      state: article.state_or_provinces
        ? article.state_or_provinces.map((state) => {
            return {
              state: state.value,
            }
          })
        : [],
      localities: article.localities
        ? article.localities.map((locality) => {
            return {
              locality: locality.value,
            }
          })
        : [],
    },
  }
  return data
}

export const getGeography = (callback) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}geography`).then((response) => {
      const data = {
        countriesSelect: response.data.countries.map((item) => {
          return { label: item.country, value: item.country }
        }),
        panCountriesSelect: response.data.panCountries.map((item) => {
          return { label: item.panCountry, value: item.panCountry }
        }),
        regonsSelect: response.data.regions.map((item) => {
          return { label: item.region, value: item.region }
        }),
        stateSelect: response.data.state.map((item) => {
          return { label: item.state, value: item.state }
        }),
        localitiesSelect: response.data.localities.map((item) => {
          return { label: item.locality, value: item.locality }
        }),
      }
      callback(data)
    })
  }
}

export const getArticlesCount = () => {
  return async (dispatch) => {
    await axios
      .get(`${API_URL}articles/count`)
      .then((response) => {
        dispatch(setAllCount(response.data))
      })
      .catch(({ response }) => {
        dispatch(setAllCount(0))
      })
  }
}

export const getArticleAction = (id, callback) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}articles/${id}`).then((response) => {
      callback(response.data)
    })
  }
}

export const getArticlesAction = (url, callback) => {
  return async (dispatch) => {
    await axios.get(`${API_URL}${url}`).then((response) => {
      callback(response.data)
    })
  }
}

export const createArticleAction = (asset, curators, organization) => {
  const data = generateArticleData(asset, curators, organization)

  return async (dispatch) => {
    dispatch(setArticleRequest())
    await axios
      .post(`${API_URL}articles`, data)
      .then((response) => {
        if (response.data.id) {
          dispatch(setProcessedArticleId(response.data.id))
          dispatch(setArticleCreateSuccess())
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          if (response.data.message === 'Asset with this URL already exists') {
            dispatch({ type: SET_URL_ERROR, message: response.data.message })
          } else {
            dispatch({
              type: SET_ORGANIZATION_ERROR,
              message: response.data.message,
            })
          }
        }
      })
  }
}

export const updateArticleAction = (asset, curators, organization) => {
  const data = generateArticleData(asset, curators, organization)

  return async (dispatch) => {
    dispatch(setArticleRequest())

    await axios
      .patch(`${API_URL}articles/${asset.id}`, data)
      .then((response) => {
        if (response.data.id) {
          dispatch(setProcessedArticleId(asset.id))
          dispatch(setArticleUpdateSuccess())
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          if (response.data.message === 'Asset with this URL already exists') {
            dispatch({ type: SET_URL_ERROR, message: response.data.message })
          } else {
            dispatch({
              type: SET_ORGANIZATION_ERROR,
              message: response.data.message,
            })
          }
        }
      })
  }
}

export const updateStatus = (id, status) => {
  const data = {
    data: {
      status: status,
    },
  }

  return async (dispatch) => {
    dispatch(setArticleRequest())

    await axios
      .patch(`${API_URL}articles/${id}`, data)
      .then((response) => {
        if (response.data.id) {
          dispatch(setProcessedArticleId(id))
          dispatch({
            type: SET_STATUS_UPDATE_SUCCESS,
          })
        }
      })
      .catch(({ response }) => {
        if (response.status === 400) {
          if (response.data.message === 'Asset with this URL already exists') {
            dispatch({ type: SET_URL_ERROR, message: response.data.message })
          } else if (
            response.data.message ===
            'Organization with this name already exist'
          ) {
            dispatch({
              type: SET_ORGANIZATION_ERROR,
              message: response.data.message,
            })
          }
        }
      })
  }
}
export const deleteArticleAction = (id) => {
  return async (dispatch) => {
    dispatch(setArticleRequest())

    await axios.delete(`${API_URL}articles/${id}`).then((response) => {
      if (response.data.status) {
        dispatch(setProcessedArticleId(id))
        dispatch({
          type: SET_ARTICLE_DELETE_SUCCESS,
        })
      }
    })
  }
}
