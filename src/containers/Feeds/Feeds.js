import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import times from '../../assets/img/icons/feeds/roundTimes.svg'

import {
  SuitableArticle,
  SuitableActivity,
  GraphSlider,
} from '../../components'

import {
  getLists,
  changeList,
  createList,
} from '../../redux/actions/listsAction'
import { changeSliderValue } from '../../redux/actions/filtersActions'

import './feeds.scss'
import {
  graphSliderDefault,
  graphSliderActive,
} from '../../assets/js/options/sliderOptions'

const Feeds = ({
  feeds,
  activeNode,
  opennedNode,
  filters,
  lists,
  isLogin,
  user,
  slider,
  getLists,
  changeList,
  createList,
  refreshGraph,
  changeSliderValue,
}) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (feeds.length) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [feeds, activeNode])

  useEffect(() => {
    if (
      user.createdAt ||
      lists.updateListSuccess ||
      lists.createListSuccess ||
      lists.deleteListSuccess
    ) {
      getLists(user)
    }
  }, [
    user,
    lists.updateListSuccess,
    lists.createListSuccess,
    lists.deleteListSuccess,
  ])

  const filteredFeeds = feeds.filter(
    (feed) => (feed && filters.graphAssets) || (feed && filters.graphActivities)
  )

  return (
    <div>
      <div
        className={
          activeNode.data && active
            ? 'zoom__buttons zoom__buttons__shifted'
            : 'zoom__buttons'
        }
      >
        <button className="button button__refresh" onClick={refreshGraph} />
        <GraphSlider
          className="graph-slider"
          value={slider}
          setValue={changeSliderValue}
          defaultMarks={graphSliderDefault}
          activeMarks={graphSliderActive}
        />
        <button className="button button__zoom_in" id="zoomIn" />
        <button className="button button__zoom_off" id="zoomOff" />
      </div>

      <aside
        className={activeNode.data && active ? 'feeds feeds-active' : 'feeds'}
      >
        <div className="feeds__resizebleBorder" />
        {filteredFeeds.length ? (
          <div className="feeds__wrap">
            <div
              style={
                (filters.graphAssets || filters.graphActivities) &&
                opennedNode.data
                  ? { backgroundColor: opennedNode.data.$color }
                  : activeNode.data && {
                      backgroundColor: activeNode.data.$color,
                    }
              }
              className="feeds__wrap__header"
            >
              <img
                className="feeds__times"
                onClick={() => setActive(false)}
                src={times}
                alt="close icon"
              />
              <div>
                <h2 className="feeds__wrap__title">
                  {filters.graphAssets || filters.graphActivities
                    ? opennedNode.name
                    : activeNode.name}
                </h2>
                {filteredFeeds.length ? (
                  <span
                    className="feeds__wrap__number"
                    style={
                      (filters.graphAssets || filters.graphActivities) &&
                      opennedNode.data
                        ? { color: opennedNode.data.$color }
                        : activeNode.data && { color: activeNode.data.$color }
                    }
                  >
                    {filteredFeeds.length}
                  </span>
                ) : null}
              </div>
              <span
                className={`feeds__wrap__description ${
                  opennedNode.data.descr ||
                  (activeNode.data && activeNode.data.descr)
                    ? 'mt-10'
                    : ''
                }`}
              >
                {(filters.graphAssets || filters.graphActivities) &&
                opennedNode.data
                  ? opennedNode.data.descr
                  : activeNode.data && activeNode.data.descr}
              </span>
            </div>

            <div className="feeds__wrap__main">
              <ul className="feeds__wrap__main-list">
                {filteredFeeds.length
                  ? filteredFeeds
                      .sort((a, b) =>
                        (a ? a.name : a.name) < (b ? b.name : b.name) ? -1 : 1
                      )
                      .map((feed) =>
                        feed.articles ? (
                          <SuitableActivity
                            feed={feed}
                            isLogin={isLogin}
                            user={user}
                            lists={lists.lists}
                            changeList={changeList}
                            createList={createList}
                            key={`activity${feed.id}`}
                          />
                        ) : (
                          <SuitableArticle
                            feed={feed}
                            isLogin={isLogin}
                            key={`asset${feed.id}`}
                            user={user}
                            lists={lists.lists}
                            changeList={changeList}
                            createList={createList}
                          />
                        )
                      )
                  : null}
              </ul>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  lists: state.lists,
  feeds: [
    ...state.filters.suitableArticles,
    ...state.filters.suitableActivities,
  ],
  slider: state.filters.slider,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getLists: (user) => dispatch(getLists(user)),
    createList: (list) => dispatch(createList(list)),
    changeList: (id, list) => dispatch(changeList(id, list)),
    changeSliderValue: (value) => dispatch(changeSliderValue(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feeds)
