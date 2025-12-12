export const ROUTE_ACCESS_CONDITION = {
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
  public: "public",
} as const;

export const ROUTES = {
  root: {
    path: "/",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  students: {
    path: "/students",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  student: {
    path: "/students/:studentId",
    build: (studentId: string | number) => `/students/${studentId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  studentsNew: {
    path: "/students/new",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  contacts: {
    path: "/contacts",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  contact: {
    path: "/contacts/:contactId",
    build: (contactId: string | number) => `/contacts/${contactId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  contactsNew: {
    path: "/contacts/new",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  signIn: {
    path: "/sign-in",
    type: ROUTE_ACCESS_CONDITION.unauthenticated,
  },
};

export const DEFAULT_UNAUTHENTICATED_ROUTE = ROUTES.signIn.path;
export const DEFAULT_AUTHENTICATED_ROUTE = ROUTES.root.path;
