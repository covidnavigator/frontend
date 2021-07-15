export const CHANGE_LEGEND_ITEM = 'CHANGE_LEGEND_ITEM'
export const RESET_LEGEND_ITEMS = 'RESET_LEGEND_ITEMS'
export const SET_LEGEND_ITEM = 'SET_LEGEND_ITEM'

export const changeLegendItem = (legendItem) => ({
  type: CHANGE_LEGEND_ITEM,
  legendItem,
})

export const resetLegendItems = () => ({
  type: RESET_LEGEND_ITEMS,
})

export const setLegendItem = (key, value) => ({
  type: SET_LEGEND_ITEM,
  key,
  value,
})
