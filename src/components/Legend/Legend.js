import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './legend.scss'
import json from '../../assets/js/data'
import { Hint } from '../Hint'

import {
  resetLegendItems,
  setLegendItem,
} from '../../redux/actions/legendAction'

function Legend({
  visibilityLevel,
  activeNode,
  graphAssets,
  graphActivities,
  opennedNode,
  legend,
  resetLegendItems,
  setLegendItem,
}) {
  const [isActiveSetting, setActiveSetting] = useState(false)
  const [isActiveProcess, setActiveProcess] = useState(false)
  const [isActiveSubject, setActiveSubject] = useState(false)
  const [isActiveResource, setActiveResource] = useState(false)

  useEffect(() => {
    resetLegendItems()
  }, [visibilityLevel, graphAssets, graphActivities])

  useEffect(() => {
    resetActiveFlags()
  }, [activeNode, opennedNode])

  const checkChilds = (obj, activeNode) => {
    if (obj.adjacencies.length === 0) {
      if (obj.id === activeNode) {
        return true
      } else {
        return false
      }
    } else if (obj.id === activeNode) {
      return true
    } else {
      const result = obj.adjacencies.filter((child) =>
        checkChilds(findObj(child.nodeTo), activeNode)
      )
      return result.length !== 0
    }
  }

  const findObj = (key) => {
    const keys = Object.keys(json)
    const nodeId = keys.filter((item) => json[item].id === key)
    return json[nodeId]
  }

  const lastSelected = (selectedSubTree) => {
    if (selectedSubTree === 'setting') {
      if (legend.careProcess || legend.subject || legend.resource) {
        setLegendItem('careSettings', !legend.careSettings)
      } else {
        return
      }
    } else if (selectedSubTree === 'process') {
      if (legend.careSettings || legend.subject || legend.resource) {
        setLegendItem('careProcess', !legend.careProcess)
      } else {
        return
      }
    } else if (selectedSubTree === 'subject') {
      if (legend.careProcess || legend.careSettings || legend.resource) {
        setLegendItem('subject', !legend.subject)
      } else {
        return
      }
    } else if (selectedSubTree === 'resource') {
      if (legend.careProcess || legend.careSettings || legend.subject) {
        setLegendItem('resource', !legend.resource)
      } else {
        return
      }
    }
  }

  const handleChangeVisibility = (e, selectedSubTree, activeNode) => {
    const keys = Object.keys(json)
    let error = Boolean
    keys.forEach((element) => {
      if (json[element].id === selectedSubTree) {
        if (
          checkChilds(json[element], activeNode.id) ||
          selectedSubTree === activeNode.id ||
          checkChilds(json[element], opennedNode.id) ||
          selectedSubTree === opennedNode.id
        ) {
          resetActiveFlags()
          error = true
        } else {
          error = false
        }
      }
    })
    setActiveFlag(selectedSubTree, error)
    if (error) {
      return
    } else {
      lastSelected(selectedSubTree)
    }
  }

  const setActiveFlag = (selectedSubTree, active) => {
    if (selectedSubTree === 'setting') {
      setActiveSetting(active)
    } else if (selectedSubTree === 'process') {
      setActiveProcess(active)
    } else if (selectedSubTree === 'subject') {
      setActiveSubject(active)
    } else if (selectedSubTree === 'resource') {
      setActiveResource(active)
    }
  }

  const resetActiveFlags = () => {
    setActiveSetting(false)
    setActiveProcess(false)
    setActiveSubject(false)
    setActiveResource(false)
  }

  return (
    <ul className="legend">
      <li
        id="Setting"
        caresettingsvis={legend.careSettings.toString()}
        careprocessvis={legend.careProcess.toString()}
        subjectvis={legend.subject.toString()}
        resourcevis={legend.resource.toString()}
        activenode={activeNode.id.toString()}
        opennednode={opennedNode.id.toString()}
        onClick={(e) => handleChangeVisibility(e, 'setting', activeNode)}
        data-legend-setting-hint="You can not deactivate the active node"
      >
        <input
          checked={legend.careSettings}
          onChange={(e) => handleChangeVisibility(e, 'setting', activeNode)}
          type="checkbox"
        />
        <label className="settings" htmlFor="">
          <div
            className={
              legend.careSettings
                ? 'legend__item_setting'
                : 'legend__item_setting legend__item_setting_icon'
            }
          />
          Setting
        </label>
      </li>

      <li
        id="Process"
        caresettingsvis={legend.careSettings.toString()}
        careprocessvis={legend.careProcess.toString()}
        subjectvis={legend.subject.toString()}
        resourcevis={legend.resource.toString()}
        activenode={activeNode.id.toString()}
        opennednode={opennedNode.id.toString()}
        onClick={(e) => handleChangeVisibility(e, 'process', activeNode)}
        data-legend-process-hint="You can not deactivate the active node"
      >
        <input
          checked={legend.careProcess}
          onChange={(e) => handleChangeVisibility(e, 'process', activeNode)}
          type="checkbox"
        />
        <label className="process" htmlFor="">
          <div
            className={
              legend.careProcess
                ? 'legend__item_process'
                : 'legend__item_process legend__item_process_icon'
            }
          />
          Process
        </label>
      </li>

      <li
        id="Subject"
        caresettingsvis={legend.careSettings.toString()}
        careprocessvis={legend.careProcess.toString()}
        subjectvis={legend.subject.toString()}
        resourcevis={legend.resource.toString()}
        activenode={activeNode.id.toString()}
        opennednode={opennedNode.id.toString()}
        onClick={(e) => handleChangeVisibility(e, 'subject', activeNode)}
        data-legend-subject-hint="You can not deactivate the active node"
      >
        <input
          checked={legend.subject}
          onChange={(e) => handleChangeVisibility(e, 'subject', activeNode)}
          type="checkbox"
        />
        <label className="subject" htmlFor="">
          <div
            className={
              legend.subject
                ? 'legend__item_subject'
                : 'legend__item_subject legend__item_subject_icon'
            }
          />
          Subject
        </label>
      </li>

      <li
        id="Resource"
        caresettingsvis={legend.careSettings.toString()}
        careprocessvis={legend.careProcess.toString()}
        subjectvis={legend.subject.toString()}
        resourcevis={legend.resource.toString()}
        activenode={activeNode.id.toString()}
        opennednode={opennedNode.id.toString()}
        onClick={(e) => handleChangeVisibility(e, 'resource', activeNode)}
        data-legend-resource-hint="You can not deactivate the active node"
      >
        <input
          checked={legend.resource}
          onChange={(e) => handleChangeVisibility(e, 'resource', activeNode)}
          type="checkbox"
        />
        <label className="resource" htmlFor="">
          <div
            className={
              legend.resource
                ? 'legend__item_resource'
                : 'legend__item_resource legend__item_resource_icon'
            }
          />
          Resource
        </label>
      </li>
      {isActiveSetting ? (
        <Hint attribute="data-legend-setting-hint" hover />
      ) : null}
      {isActiveProcess ? (
        <Hint attribute="data-legend-process-hint" hover />
      ) : null}
      {isActiveSubject ? (
        <Hint attribute="data-legend-subject-hint" hover />
      ) : null}
      {isActiveResource ? (
        <Hint attribute="data-legend-resource-hint" hover />
      ) : null}
    </ul>
  )
}

const mapStateToProps = (state) => ({
  legend: state.legend,
})

const mapDispatchToProps = (dispatch) => {
  return {
    resetLegendItems: () => dispatch(resetLegendItems()),
    setLegendItem: (key, value) => dispatch(setLegendItem(key, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legend)
