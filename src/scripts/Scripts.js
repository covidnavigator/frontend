import { useRef } from 'react'

export const isClickOnNotification = (target) => {
  if (!document.querySelector('.notification')) return false
  for (let notification of document.querySelectorAll('.notification')) {
    if (notification.contains(target)) {
      return true
    }
  }
  return false
}

export const isClickOnMenu = (target) => {
  if (
    document.querySelector('.menu_overlay') &&
    document.querySelector('.menu_overlay').contains(target)
  ) {
    return true
  } else {
    return false
  }
}

export const useComponentWillMount = (func) => {
  const willMount = useRef(true)

  if (willMount.current) func()

  willMount.current = false
}
