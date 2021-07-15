export const CHANGE_REGISTER_VALUE = 'CHANGE_REGISTER_VALUE'

export const changeRegisterValue = (name, value) => ({
  type: CHANGE_REGISTER_VALUE,
  payload: {
    name,
    value,
  },
})
