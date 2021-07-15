import React, { useEffect, useState } from 'react'

import { Filters, FilterSelect, FormRadioGroup } from '../../components'
import users from '../../assets/img/icons/users.svg'
import globe from '../../assets/img/icons/globe.svg'

import './filterBar.scss'

import {
  filters as filtersData,
  options,
  assetsFilters,
  activitiesFilters,
  visibilityOptions,
} from '../../assets/js/options/articlesFilters'
import { languages } from '../../assets/js/options/formOptions'

function FilterBar({
  filters,
  activeFilters,
  setFilterValue,
  resetFilters,
  changeGraphAssets,
  changeGraphActivities,
}) {
  const [entityVisibility, setEntityVisibility] = useState('All')
  const [active, setActive] = useState(false)

  const changeFiltersView = () => {
    setActive(!active)
  }

  const changeEntityVisibility = (key, value) => {
    setEntityVisibility(value)
  }

  useEffect(() => {
    switch (entityVisibility) {
      case 'All':
        changeGraphAssets(true)
        changeGraphActivities(true)
        break

      case 'Assets':
        changeGraphAssets(true)
        changeGraphActivities(false)
        break

      case 'Activities':
        changeGraphAssets(false)
        changeGraphActivities(true)
        break

      default:
        changeGraphAssets(true)
        changeGraphActivities(true)
        break
    }
  }, [entityVisibility])

  const handleChangingFilterValue = (value, key) => {
    setFilterValue(key, value)
  }

  const generateFilters = (type) => {
    let suitableFilters = []
    if (type === 'common') {
      suitableFilters = filtersData.filter(
        (filter) =>
          assetsFilters.includes(filter.group) &&
          activitiesFilters.includes(filter.group)
      )
    } else if (type === 'asset') {
      suitableFilters = filtersData.filter(
        (filter) =>
          assetsFilters.includes(filter.group) &&
          !activitiesFilters.includes(filter.group)
      )
    } else {
      suitableFilters = filtersData.filter(
        (filter) =>
          !assetsFilters.includes(filter.group) &&
          activitiesFilters.includes(filter.group)
      )
    }

    return suitableFilters.map((filter, index) => (
      <Filters
        handleChangingFilterValue={handleChangingFilterValue}
        filters={filters}
        key={index}
        title={filter.label}
        group={filter.group}
        items={filter.items}
      />
    ))
  }

  return (
    <aside className={active ? 'filter-bar filter-bar-active' : 'filter-bar'}>
      <div className="filter-bar__header">
        <div
          onClick={changeFiltersView}
          className="filter-bar__button"
          alt="filters-number"
        >
          <div className="filter-bar__button-icon" />
          {activeFilters !== 0 && (
            <span className="filter-bar__number">{activeFilters}</span>
          )}
        </div>

        <button
          onClick={resetFilters}
          className="filter-bar__clear-button filter-bar__reset"
          disabled={activeFilters === 0}
        >
          Clear
        </button>
      </div>
      <div className="filter-bar__wrap"></div>

      <div className="filter-bar__main">
        <FilterSelect
          className="filter-bar__role"
          icon={users}
          value={options.filter((option) => option.value === filters.role)}
          options={options}
          onChange={(selectedOption) =>
            setFilterValue('role', selectedOption.value)
          }
        />

        <FilterSelect
          className="filters__lang"
          icon={globe}
          options={languages}
          value={
            languages[0].options.filter(
              (lang) => lang.value === filters.language
            ).length !== 0
              ? languages[0].options.filter(
                  (lang) => lang.value === filters.language
                )
              : languages[1].options.filter(
                  (lang) => lang.value === filters.language
                )
          }
          onChange={(selectedOption) =>
            handleChangingFilterValue(selectedOption.value, 'language')
          }
        />

        <div className="filters__radio">
          <div className="filters__radio-header">
            <h3 className="filters__title">Content Scope</h3>
          </div>
          <FormRadioGroup
            className="filters__radio-group"
            name="entityVisibility"
            value={entityVisibility}
            options={visibilityOptions}
            onChange={changeEntityVisibility}
          />
        </div>

        {generateFilters('common')}

        {filters.graphAssets && generateFilters('asset')}

        {filters.graphActivities && generateFilters('activity')}

        <div className="filters-note mt-30">
          <div className="filters__header">
            <h3 className="filters__title">Note:</h3>
          </div>
          <ul className="filters-list">
            <li>
              Filtering applies to the asset list shown once a node on the graph
              is selected
            </li>
          </ul>
        </div>

        <div className="filters-note">
          <div className="filters__header">
            <h3 className="filters__title">Coming soon:</h3>
          </div>
          <ul className="filters-list">
            <li>Filter by curator</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default FilterBar
