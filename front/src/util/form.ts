export const REG_EXP_EMAIL: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const REG_EXP_PASSWORD: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export enum FIELD_ERROR  {
    IS_EMPTY = "The field is empty, please enter a value",
    IS_BIG = "Value is too long",
    EMAIL = "Enter a valid email address",
    PASSWORD = "Password is too short, must be at least 8 characters"
}

export const validate = (value: string, type ?: string) => {
    if (value.trim().length < 1) {
        return FIELD_ERROR.IS_EMPTY
    }

    if (value.trim().length > 30) {
        return FIELD_ERROR.IS_BIG
    }

    if (type === "email" && !REG_EXP_EMAIL.test(value)) {
        return FIELD_ERROR.EMAIL;
    }

    if (type === "password" && !REG_EXP_PASSWORD.test(value)) {
        return FIELD_ERROR.PASSWORD
    }

    return "";
}

interface State {

    email: string,
    password: string,
    code: string,
    amount: string,
    source: string,
    passwordOld: string,
    passwordNew: string,

    messageE: string,
    messageP: string,
    messageCode: string,
    messageSum: string,
    messageSource: string,
    messagePO: string,
    messagePN: string,
    messageData: string, 

    showPass: boolean
}

interface Action {
    type: string,
    payload ?: any;
}

export const initialState: State = {
	email: "",
	password: "",
	code: "",
	amount: "",
	source: "",
	passwordOld: "",
	passwordNew: "",

	messageE: "",
	messageP: "",
	messageCode: "",
	messageSum: "",
	messageSource: "",
	messagePO: "",
	messagePN: "",
	messageData: "",

	showPass: false,
  };

export const SET = {
    SET_EMAIL: "SET_EMAIL",
    SET_PASSWORD: "SET_PASSWORD",
    SET_CODE: "SET_CODE",

    SET_AMOUNT: "SET_AMOUNT",
	SET_SOURCE: "SET_SOURCE",
	SET_PASSWORD_OLD: "SET_PASSWORD_OLD",
	SET_PASSWORD_NEW: "SET_PASSWORD_NEW",

	SET_MESSAGE_EMAIL: "SET_MESSAGE_E",
	SET_MESSAGE_PASSWORD: "SET_MESSAGE_P",
	SET_MESSAGE_CODE: "SET_MESSAGE_CODE",
    SET_MESSAGE_SUM: "SET_MESSAGE_SUM",
    SET_MESSAGE_SOURCE: "SET_MESSAGE_SOURCE",
    SET_MESSAGE_PASSWORD_OLD: "SET_MESSAGE_PASSWORD_OLD",
    SET_MESSAGE_PASSWORD_NEW: "SET_MESSAGE_PASSWORD_NEW",
    SET_MESSAGE_DATA: "SET_MESSAGE_DATA",

    TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY"
}

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case SET.SET_EMAIL :
			return { ...state, email: action.payload };
		case SET.SET_PASSWORD:
			return { ...state, password: action.payload };
		case SET.SET_CODE:
			return { ...state, code: action.payload };
		

		case SET.TOGGLE_VISIBILITY:
			return { ...state, showPass: !state.showPass };
		default:
			return {...state};
	}
  };