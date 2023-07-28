const defaultAuthState = {
  userMeta: undefined,
};

const USER_SIGNED_IN = "USER_SIGNED_IN";
const USER_SIGNED_OUT = "USER_SIGNED_OUT";
const BALANCE_CHANGE = "BALANCE_CHANGE";
const userReducer = (state = defaultAuthState, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        userMeta: action.userMeta,
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
        userMeta: undefined,
      };
    case BALANCE_CHANGE:
      return {
        ...state,
        userMeta: {
          ...state.userMeta,
          balance: action.newBalance,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
