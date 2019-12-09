export const statePending = {
  data: null,
  loading: true,
  error: false,
  complete: false,
  error_data: null
}

export const stateInit = {
  data: null,
  loading: false,
  complete: false,
  error: false,
  error_data: null
}

export const stateSuccess = {
  data: null,
  loading: false,
  error: false,
  complete: true,
  error_data: null
}

export const stateError = {
  data: null,
  loading: false,
  error: true,
  complete: true,
  error_data: null
}
