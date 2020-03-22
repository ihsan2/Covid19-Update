const initialState = {
  countries: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  confirm: {},
  all: {},
};

const data = (state = initialState, action) => {
  switch (action.type) {
    // get list of countries
    case 'COUNTRIES_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'COUNTRIES_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'COUNTRIES_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        countries: action.payload.data,
      };

    // get list of confirm
    case 'CONFIRM_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'CONFIRM_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'CONFIRM_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        confirm: action.payload.data,
      };

    // get list of ALL
    case 'ALL_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ALL_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'ALL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        all: action.payload.data,
      };

    default:
      return state;
  }
};

export default data;
