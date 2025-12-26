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
  studentContact: {
    path: "/students/:studentId/contacts/:contactId",
    build: (studentId: string | number, contactId: string | number) =>
      `/students/${studentId}/contacts/${contactId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  studentContactsNew: {
    path: "/students/:studentId/contacts/new",
    build: (studentId: string | number) =>
      `/students/${studentId}/contacts/new`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  studentSchoolEnrollment: {
    path: "/students/:studentId/school-enrollments/:schoolEnrollmentId",
    build: (studentId: string | number, schoolEnrollmentId: string | number) =>
      `/students/${studentId}/school-enrollments/${schoolEnrollmentId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  studentSchoolEnrollmentsNew: {
    path: "/students/:studentId/school-enrollments/new",
    build: (studentId: string | number) =>
      `/students/${studentId}/school-enrollments/new`,
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
  schoolGrades: {
    path: "/school-grades",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  schoolGrade: {
    path: "/school-grades/:schoolGradeId",
    build: (schoolGradeId: string | number) =>
      `/school-grades/${schoolGradeId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  schoolGradesNew: {
    path: "/school-grades/new",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  academicYears: {
    path: "/academic-years",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  academicYear: {
    path: "/academic-years/:academicYearId",
    build: (academicYearId: string | number) =>
      `/academic-years/${academicYearId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  academicYearFinanceFeeSchedule: {
    path: "/academic-years/:academicYearId/finance-fee-schedules/:financeFeeScheduleId",
    build: (
      academicYearId: string | number,
      financeFeeScheduleId: string | number,
    ) =>
      `/academic-years/${academicYearId}/finance-fee-schedules/${financeFeeScheduleId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  academicYearFinanceFeeSchedulesNew: {
    path: "/academic-years/:academicYearId/finance-fee-schedules/new",
    build: (academicYearId: string | number) =>
      `/academic-years/${academicYearId}/finance-fee-schedules/new`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  academicYearsNew: {
    path: "/academic-years/new",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  financeFeeTypes: {
    path: "/finance-fee-types",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  financeFeeType: {
    path: "/finance-fee-types/:financeFeeTypeId",
    build: (financeFeeTypeId: string | number) =>
      `/finance-fee-types/${financeFeeTypeId}`,
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  financeFeeTypesNew: {
    path: "/finance-fee-types/new",
    type: ROUTE_ACCESS_CONDITION.authenticated,
  },
  signIn: {
    path: "/sign-in",
    type: ROUTE_ACCESS_CONDITION.unauthenticated,
  },
};

export const DEFAULT_UNAUTHENTICATED_ROUTE = ROUTES.signIn.path;
export const DEFAULT_AUTHENTICATED_ROUTE = ROUTES.root.path;
