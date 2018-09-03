

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_user {
  __typename: "User";
  id: string;
}

export interface signup_signup {
  __typename: "AuthPayload";
  token: string;
  user: signup_signup_user;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  data: SignupInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_currentUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
}

export interface currentUser {
  currentUser: currentUser_currentUser | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================