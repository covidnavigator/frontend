import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'

import FilterBar from '../FilterBar/FilterBar'
import Feeds from '../Feeds/Feeds'
import { Modal, Footer } from '../../components'
import AssetModalDetails from '../../components/Modal/ModalDetails/AssetModalDetails'

import { options } from '../../assets/js/options/articlesFilters'

import graphData from '../../assets/js/data'
import {
  careSettingData,
  careProcessData,
  subjectData,
  resourceData,
} from '../../assets/js/data'
import './graph.scss'

import init from '../../assets/js/RGraph2'

import {
  changeFilterValue,
  changeGraphAssets,
  changeGraphActivities,
  setOpeennedNode,
  setActiveNode,
  setSuitableData,
  resetFiltersValue,
  chageStatus,
  getGraphData,
} from '../../redux/actions/filtersActions'
import { setLogin, setLoginProcess } from '../../redux/actions/loginAction'
import {
  changeLegendItem,
  resetLegendItems,
} from '../../redux/actions/legendAction'

import ApplicationHelper from '../../assets/js/utils'

import { cloneDeep } from 'lodash'
import ActivityModalDetails from '../../components/Modal/ModalDetails/ActivityModalDetails'

function Graph({
  filters,
  isLogin,
  setLogin,
  history,
  opennedNode,
  activeNode,
  slider,
  changeFilterValue,
  changeGraphAssets,
  changeGraphActivities,
  setOpeennedNode,
  setActiveNode,
  suitableArticles,
  suitableActivities,
  setSuitableData,
  chageStatus,
  resetFiltersValue,
  articles,
  activities,
  getGraphData,
  setLoginProcess,
  changeLegendItem,
  resetLegendItems,
}) {
  const dispatch = useDispatch()
  const [firstRender, setFirstRender] = useState(true)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenActivityModal, setOpenActivityModal] = useState(false)
  const [activeAsset, setActiveAsset] = useState(0)
  const [activeActivity, setActiveActivity] = useState(0)

  useEffect(() => {
    if (
      !isLogin ||
      new Date(ApplicationHelper.getCurrentUserData().refreshExpiration) <
        new Date()
    ) {
      setLogin(false)
    }
    setActiveNode({ id: '', data: { $assetId: '', $activityId: '' }, name: '' })
    setSuitableData({ articles: [], activities: [] })
    setLoginProcess(false)
    dispatch(chageStatus(true))
    resetLegendItems()
    getPropsFromLanding()
  }, [])

  const getPropsFromLanding = () => {
    const getRegexpFor = (paramName) => {
      return RegExp(`[\?|&]${paramName}=([\\s\\S]+?)(&|$)`)
    }

    const urlFromLanding = window.location.href
    history.push('/graph')

    if (getRegexpFor('role').test(urlFromLanding)) {
      const role = urlFromLanding.match(getRegexpFor('role'))[1]
      if (options.filter((item) => item.value === role).length !== 0) {
        changeFilterValue(
          'role',
          options.filter((item) => item.value === role)[0].value
        )
      }
    }

    if (getRegexpFor('node').test(urlFromLanding)) {
      document.getElementById('navigator').innerHTML = ''
      const node = urlFromLanding.match(getRegexpFor('node'))[1]
      if (node !== 'covidNavigator') {
        if (isCorrectNode(node)) {
          setLegendItem(node)
        }

        init(getDataForNode(node), setActive, filters.visibilityLevel, {
          id: '',
          data: { $assetId: '', $activityId: '' },
          name: '',
        })
      } else {
        init(graphData, setActive, filters.visibilityLevel, {
          id: '',
          data: { $assetId: '', $activityId: '' },
          name: '',
        })
      }
    } else {
      init(graphData, setActive, filters.visibilityLevel, {
        id: '',
        data: { $assetId: '', $activityId: '' },
        name: '',
      })
    }
  }

  const isCorrectNode = (node) => {
    if (
      node === 'careProcess' ||
      node === 'careSettings' ||
      node === 'subject' ||
      node === 'resource'
    ) {
      return true
    }
    return false
  }

  const getDataForNode = (node) => {
    switch (node) {
      case 'careProcess':
        return careProcessData
      case 'careSettings':
        return careSettingData
      case 'subject':
        return subjectData
      case 'resource':
        return resourceData
      default:
        return graphData
    }
  }

  useEffect(() => {
    if (
      activeNode.id &&
      !firstRender &&
      !(activeNode.data.$activityId || activeNode.data.$assetId)
    ) {
      getGraphData(filters, activeNode)
    }
  }, [
    filters.role,
    filters.graphActivities,
    filters.graphAssets,
    filters.language,
    filters.formalism,
    filters.source_type,
    filters.maturity_version,
    filters.publication_type,
    filters.knowledge_lifecycle_stage,
  ])

  useEffect(() => {
    if (
      !firstRender &&
      !(activeNode.data.$activityId || activeNode.data.$assetId)
    ) {
      document.getElementById('navigator').innerHTML = ''
      if (filters.graphAssets || filters.graphActivities) {
        dispatch(setOpeennedNode(activeNode))
        init(modifyJson(), setActive, filters.visibilityLevel, activeNode)
      } else {
        init(graphData, setActive, filters.visibilityLevel, activeNode)
      }
      changeFilterValue('language', filters.language)
    }
    if (activeNode.data.$activityId || activeNode.data.$assetId) {
      setActiveNode(opennedNode)
    }
    setFirstRender(false)
  }, [
    filters.visibilityLevel,
    filters.graphAllRelations,
    filters.graphRelated,
    filters.graphAssets,
    filters.graphActivities,
  ])

  useEffect(() => {
    dispatch(chageStatus(true))
    if (!firstRender) {
      if (filters.graphAssets || filters.graphActivities) {
        document.getElementById('navigator').innerHTML = ''
        dispatch(setOpeennedNode(activeNode))
        init(modifyJson(), setActive, filters.visibilityLevel, activeNode)
      }
    }
    return () => {
      dispatch(chageStatus(false))
      setActiveAsset(0)
      setActiveActivity(0)
    }
  }, [suitableArticles, suitableActivities])

  useEffect(() => {
    if (activeAsset !== 0) {
      setOpenModal(true)
    }
    if (activeActivity !== 0) {
      setOpenActivityModal(true)
    }
  }, [activeAsset, activeActivity])

  useEffect(() => {
    if (
      (filters.graphAssets || filters.graphActivities) &&
      !firstRender &&
      activeNode.id
    ) {
      if (activeNode.data && activeNode.data.$assetId) {
        setActiveAsset(activeNode.data.$assetId)
      } else if (activeNode.data && activeNode.data.$activityId) {
        setActiveActivity(activeNode.data.$activityId)
      } else if (
        activeNode.name === 'Care Setting' ||
        activeNode.name === 'Care Process' ||
        activeNode.name === 'Subject' ||
        activeNode.name === 'Resource' ||
        activeNode.name === 'Activity' ||
        activeNode.name === 'Knowledge Artifact' ||
        activeNode.name === 'COVID NAVIGATOR'
      ) {
        return
      } else if (activeNode.id) {
        getGraphData(filters, activeNode)
      }
    }
  }, [activeNode])

  useEffect(() => {
    if (
      articles.creationSuccess ||
      articles.updationSuccess ||
      articles.updateStatusSuccess ||
      articles.deletionSuccess ||
      activities.activitySuccesfullyCreated ||
      activities.activitySuccessfullyUpdated ||
      activities.activitySuccessfullyDeleted
    ) {
      refreshGraph()
      handleClickModal()
    }
  }, [
    articles.creationSuccess,
    articles.updationSuccess,
    articles.deletionSuccess,
    articles.updateStatusSuccess,
    activities.activitySuccesfullyCreated,
    activities.activitySuccessfullyUpdated,
    activities.activitySuccessfullyDeleted,
  ])

  useEffect(() => {
    switch (slider) {
      case 0:
        changeFilterValue('visibilityLevel', 1)
        changeFilterValue('graphAllRelations', false)
        changeFilterValue('graphRelated', false)
        break

      case 1:
        changeFilterValue('visibilityLevel', 1)
        changeFilterValue('graphAllRelations', false)
        changeFilterValue('graphRelated', false)
        break

      case 2:
        changeFilterValue('visibilityLevel', 100)
        changeFilterValue('graphAllRelations', false)
        changeFilterValue('graphRelated', false)
        break

      case 3:
        changeFilterValue('visibilityLevel', 100)
        changeFilterValue('graphAllRelations', true)
        changeFilterValue('graphRelated', false)
        break

      case 4:
        changeFilterValue('visibilityLevel', 100)
        changeFilterValue('graphAllRelations', true)
        changeFilterValue('graphRelated', true)
        break
    }
  }, [slider])

  const handleClickModal = () => {
    setOpenModal(false)
    setOpenActivityModal(false)
    setActiveAsset(0)
    setActiveActivity(0)
  }

  const modifyJson = () => {
    let jsonData = cloneDeep(graphData)
    let jsonKeys = Object.keys(jsonData)
    if (filters.graphAssets && suitableArticles.length) {
      jsonData = modifyJsonWithAssets(jsonData, jsonKeys)
      jsonKeys = Object.keys(jsonData)
    }
    if (filters.graphActivities && suitableActivities.length) {
      jsonData = modifyJsonWithActivities(jsonData, jsonKeys)
    }
    return jsonData
  }

  const modifyJsonWithAssets = (jsonData, jsonKeys) => {
    suitableArticles.forEach((article) => {
      const connectedNodes = jsonKeys.filter((key) =>
        article.categories.includes(jsonData[key].id)
      )
      jsonData[article.name] = {
        adjacencies: [],
        data: {
          $color: '#a7a7a7',
          $type: 'circle',
          $assetId: article.id,
          description: article.description,
          group: 'asset',
        },
        id: article.name.replaceAll(' ', '').toLowerCase(),
        name: article.name,
      }
      if (filters.graphAllRelations) {
        connectedNodes.forEach((node) => {
          jsonData[node].adjacencies = [
            ...jsonData[node].adjacencies,
            {
              nodeTo: article.name.replaceAll(' ', '').toLowerCase(),
              nodeFrom: jsonData[node].id,
              data: { $color: '#557EAA', $type: 'line' },
            },
          ]
        })
      } else {
        const rootCategory = connectedNodes.find(
          (node) => node === activeNode.name
        )
        if (rootCategory) {
          jsonData[rootCategory].adjacencies = [
            ...jsonData[rootCategory].adjacencies,
            {
              nodeTo: article.name.replaceAll(' ', '').toLowerCase(),
              nodeFrom: jsonData[rootCategory].id,
              data: { $color: '#557EAA', $type: 'line' },
            },
          ]
        }
      }
    })
    return jsonData
  }

  const modifyJsonWithActivities = (jsonData, jsonKeys) => {
    suitableActivities.forEach((activity) => {
      const connectedNodes = jsonKeys.filter((key) =>
        activity.categories.includes(jsonData[key].id)
      )
      jsonData[activity.name] = {
        adjacencies: [],
        data: {
          $color: '#af1f1f',
          $type: 'triangle',
          $activityId: activity.id,
          description: activity.description,
          group: 'activity',
        },
        id: activity.name.replaceAll(' ', '').toLowerCase(),
        name: activity.name,
      }
      if (filters.graphAllRelations) {
        connectedNodes.forEach((node) => {
          jsonData[node].adjacencies = [
            ...jsonData[node].adjacencies,
            {
              nodeTo: activity.name.replaceAll(' ', '').toLowerCase(),
              nodeFrom: jsonData[node].id,
              data: { $color: '#557EAA', $type: 'line' },
            },
          ]
        })
      } else {
        const rootCategory = connectedNodes.find(
          (node) => node === activeNode.name
        )
        if (rootCategory) {
          jsonData[rootCategory].adjacencies = [
            ...jsonData[rootCategory].adjacencies,
            {
              nodeTo: activity.name.replaceAll(' ', '').toLowerCase(),
              nodeFrom: jsonData[rootCategory].id,
              data: { $color: '#557EAA', $type: 'line' },
            },
          ]
        }
      }
      if (filters.graphRelated) {
        connectRelatedActivities(activity, jsonData, Object.keys(jsonData))
        if (filters.graphAssets) {
          connectAssetsToActivity(activity, jsonData, jsonKeys)
        }
      }
    })
    return jsonData
  }

  const connectRelatedActivities = (activity, jsonData, jsonKeys) => {
    const connectedActivities = jsonKeys.filter((key) => {
      return activity.related.some((rActivity) => rActivity.name === key)
    })
    connectedActivities.forEach((cActivity) => {
      jsonData[cActivity].adjacencies = [
        ...jsonData[cActivity].adjacencies,
        {
          nodeTo: activity.name.replaceAll(' ', '').toLowerCase(),
          nodeFrom: jsonData[cActivity].id,
          data: { $color: '#557EAA', $type: 'line' },
        },
      ]
    })
    activity.related.forEach((rActivity) => {
      if (jsonKeys.includes(rActivity.name)) return
      jsonData[rActivity.name] = {
        adjacencies: [
          {
            nodeTo: jsonData[activity.name].id,
            nodeFrom: rActivity.name.replace(' ', '').toLowerCase(),
            data: { $color: '#557EAA', $type: 'line' },
          },
        ],
        data: {
          $color: '#af1f1f',
          $type: 'triangle',
          $activityId: rActivity.id,
          description: rActivity.description,
          group: 'activity',
        },
        id: rActivity.name.replaceAll(' ', '').toLowerCase(),
        name: rActivity.name,
      }
    })
  }

  const connectAssetsToActivity = (activity, jsonData, jsonKeys) => {
    const connectedAssets = jsonKeys.filter((key) =>
      activity.articles.some((article) => article.name === key)
    )
    connectedAssets.forEach((asset) => {
      jsonData[asset].adjacencies = [
        ...jsonData[asset].adjacencies,
        {
          nodeTo: activity.name.replaceAll(' ', '').toLowerCase(),
          nodeFrom: jsonData[asset].id,
          data: { $color: '#557EAA', $type: 'line' },
        },
      ]
    })
    activity.articles.forEach((article) => {
      if (jsonKeys.includes(article.name)) return
      jsonData[article.name] = {
        adjacencies: [
          {
            nodeTo: jsonData[activity.name].id,
            nodeFrom: article.name.replace(' ', '').toLowerCase(),
            data: { $color: '#557EAA', $type: 'line' },
          },
        ],
        data: {
          $color: '#a7a7a7',
          $type: 'circle',
          $assetId: article.id,
          description: article.description,
          group: 'asset',
        },
        id: article.name.replace(' ', '').toLowerCase(),
        name: article.name,
      }
    })
  }

  const setLegendItem = (item) => {
    changeLegendItem(item)
  }

  const setActive = (node) => {
    setActiveNode(node)
  }

  const resetFilters = () => {
    dispatch(resetFiltersValue())
  }

  const refreshGraph = () => {
    setActiveNode({ id: '', data: { $assetId: '', $activityId: '' }, name: '' })
    setOpeennedNode({
      id: '',
      data: { $assetId: '', $activityId: '' },
      name: '',
    })
    setSuitableData({ articles: [], activities: [] })
    document.getElementById('navigator').innerHTML = ''

    init(graphData, setActive, filters.visibilityLevel, {
      id: '',
      data: { $assetId: '', $activityId: '' },
      name: '',
    })
    resetLegendItems()
  }

  return (
    <>
      <div className="graph">
        <FilterBar
          filters={filters}
          setFilterValue={changeFilterValue}
          activeFilters={filters.activeFilters}
          resetFilters={resetFilters}
          changeGraphAssets={changeGraphAssets}
          changeGraphActivities={changeGraphActivities}
        />
        <div className="navigator">
          <div id="navigator"></div>
        </div>
        <Feeds
          isLogin={isLogin}
          filters={filters}
          activeNode={activeNode}
          opennedNode={opennedNode}
          refreshGraph={refreshGraph}
        />
        {isOpenModal && (
          <Modal>
            <AssetModalDetails
              id={activeAsset}
              handleClose={handleClickModal}
            />
          </Modal>
        )}
        {isOpenActivityModal && (
          <Modal>
            <ActivityModalDetails
              id={activeActivity}
              handleClose={handleClickModal}
            />
          </Modal>
        )}
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  activities: state.activities,
  filters: state.filters.filters,
  slider: state.filters.slider,
  lists: state.lists.lists,
  suitableArticles: state.filters.suitableArticles,
  suitableActivities: state.filters.suitableActivities,
  opennedNode: state.filters.opennedNode,
  activeNode: state.filters.activeNode,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeFilterValue: (key, value) => dispatch(changeFilterValue(key, value)),
    setOpeennedNode: (node) => dispatch(setOpeennedNode(node)),
    setSuitableData: (data) => dispatch(setSuitableData(data)),
    setActiveNode: (node) => dispatch(setActiveNode(node)),
    resetFiltersValue: () => dispatch(resetFiltersValue()),
    chageStatus: (status) => dispatch(chageStatus(status)),
    setLoginProcess: (loginProcess) => dispatch(setLoginProcess(loginProcess)),
    setLogin: (isLogin) => dispatch(setLogin(isLogin)),
    changeLegendItem: (legendItem) => dispatch(changeLegendItem(legendItem)),
    resetLegendItems: () => dispatch(resetLegendItems()),
    changeGraphAssets: (graphAssets) =>
      dispatch(changeGraphAssets(graphAssets)),
    changeGraphActivities: (graphActivities) =>
      dispatch(changeGraphActivities(graphActivities)),
    getGraphData: (filters, node) => dispatch(getGraphData(filters, node)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
