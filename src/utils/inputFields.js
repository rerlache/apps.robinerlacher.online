export const firstname_validation = {
  id: "firstname",
  name: "firstname",
  label: "First name",
  type: "text",
  placeholder: "Enter your first name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 3,
      message: "min. 3 characters.",
    },
    maxLength: {
      value: 50,
      message: "max. 50 characters.",
    },
  },
};
export const lastname_validation = {
  id: "lastname",
  name: "lastname",
  label: "Last name",
  type: "text",
  placeholder: "Enter your last name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 3,
      message: "min. 3 characters.",
    },
    maxLength: {
      value: 50,
      message: "max. 50 characters.",
    },
  },
};
export const username_validation = {
  id: "username",
  name: "username",
  label: "User name",
  type: "text",
  placeholder: "Enter your username",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 3,
      message: "min. 3 characters.",
    },
    maxLength: {
      value: 50,
      message: "max. 50 characters.",
    },
  },
};
export const email_validation = {
  id: "email",
  name: "email",
  label: "E-Mail",
  type: "email",
  placeholder: "Enter your email",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};
export const password_validation = {
  id: "password",
  name: "password",
  label: "Password",
  type: "password",
  placeholder: "Enter your password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 3,
      message: "min. 3 characters.",
    },
    maxLength: {
      value: 50,
      message: "max. 50 characters.",
    },
  },
};
export const confirm_password_validation = {
  id: "confirmPassword",
  name: "confirmPassword",
  label: "Confirm Password",
  type: "password",
  placeholder: "Confirm your password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    minLength: {
      value: 3,
      message: "min. 3 characters.",
    },
  },
};
export const question_validation = {
  id: "question",
  name: "question",
  label: "Security Question",
  type: "text",
  placeholder: "Enter a question only you can answer",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};
export const answer_validation = {
  id: "answer",
  name: "answer",
  label: "Answer",
  type: "text",
  placeholder: "Enter the answer",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};
