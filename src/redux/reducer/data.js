const initialState = {
  countries: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  confirm: {},
  all: {},
  ina: [],
  prov: [],
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

    // get list of indonesai
    case 'INA_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'INA_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'INA_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        ina: action.payload.data,
      };

    // get list of provinsi
    case 'PROV_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'PROV_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'PROV_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        prov: action.payload.data,
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
