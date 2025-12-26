import Router, { Route } from "preact-router";
import { PageSignIn } from "./pages/PageSignIn";
import { PageHome } from "./pages/PageHome";
import { LayoutRoute } from "./layouts/LayoutRoute";
import { ROUTES } from "./lib/constants/routes";
import { PageStudents } from "./pages/students/PageStudents";
import { PageNewStudent } from "./pages/students/PageNewStudent";
import { PageStudent } from "./pages/students/PageStudent";
import { LayoutRoutes } from "./layouts/LayoutRoutes";
import { PageContacts } from "./pages/contacts/PageContacts";
import { PageNewContact } from "./pages/contacts/PageNewContact";
import { PageContact } from "./pages/contacts/PageContact";
import { PageStudentContact } from "./pages/students/student-contacts/PageStudentContact";
import { PageNewStudentContact } from "./pages/students/student-contacts/PageNewStudentContact";
import { PageSchoolGrades } from "./pages/school-grades/PageSchoolGrades";
import { PageNewSchoolGrade } from "./pages/school-grades/PageNewSchoolGrade";
import { PageSchoolGrade } from "./pages/school-grades/PageSchoolGrade";
import { PageAcademicYears } from "./pages/academic-years/PageAcademicYears";
import { PageNewAcademicYear } from "./pages/academic-years/PageNewAcademicYear";
import { PageAcademicYear } from "./pages/academic-years/PageAcademicYear";
import { PageFinanceFeeTypes } from "./pages/finance-fee-types/PageFinanceFeeTypes";
import { PageNewFinanceFeeType } from "./pages/finance-fee-types/PageNewFinanceFeeType";
import { PageFinanceFeeType } from "./pages/finance-fee-types/PageFinanceFeeType";
import { PageStudentSchoolEnrollment } from "./pages/students/student-school-enrollments/PageStudentSchoolEnrollment";
import { PageNewStudentSchoolEnrollment } from "./pages/students/student-school-enrollments/PageNewStudentSchoolEnrollment";
import { PageAcademicYearFinanceFeeSchedule } from "./pages/academic-years/academic-year-finance-fee-schedules/PageAcademicYearFinanceFeeSchedule";
import { PageNewAcademicYearFinanceFeeSchedule } from "./pages/academic-years/academic-year-finance-fee-schedules/PageNewAcademicYearFinanceFeeSchedule";

export function App() {
  return (
    <LayoutRoutes>
      <Router>
        <Route
          path={ROUTES.root.path}
          component={() => (
            <LayoutRoute type={ROUTES.root.type}>
              <PageHome />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.students.path}
          component={() => (
            <LayoutRoute type={ROUTES.students.type}>
              <PageStudents />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.studentsNew.path}
          component={() => (
            <LayoutRoute type={ROUTES.studentsNew.type}>
              <PageNewStudent />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.student.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.student.type}>
              <PageStudent {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.studentContact.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.studentContact.type}>
              <PageStudentContact {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.studentContactsNew.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.studentContactsNew.type}>
              <PageNewStudentContact {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.studentSchoolEnrollment.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.studentSchoolEnrollment.type}>
              <PageStudentSchoolEnrollment {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.studentSchoolEnrollmentsNew.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.studentSchoolEnrollmentsNew.type}>
              <PageNewStudentSchoolEnrollment {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.contacts.path}
          component={() => (
            <LayoutRoute type={ROUTES.contacts.type}>
              <PageContacts />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.contactsNew.path}
          component={() => (
            <LayoutRoute type={ROUTES.contactsNew.type}>
              <PageNewContact />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.contact.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.contact.type}>
              <PageContact {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.schoolGrades.path}
          component={() => (
            <LayoutRoute type={ROUTES.schoolGrades.type}>
              <PageSchoolGrades />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.schoolGradesNew.path}
          component={() => (
            <LayoutRoute type={ROUTES.schoolGradesNew.type}>
              <PageNewSchoolGrade />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.schoolGrade.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.schoolGrade.type}>
              <PageSchoolGrade {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYears.path}
          component={() => (
            <LayoutRoute type={ROUTES.academicYears.type}>
              <PageAcademicYears />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYearsNew.path}
          component={() => (
            <LayoutRoute type={ROUTES.academicYearsNew.type}>
              <PageNewAcademicYear />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYear.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.academicYear.type}>
              <PageAcademicYear {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYear.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.academicYear.type}>
              <PageAcademicYear {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYearFinanceFeeSchedule.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.academicYearFinanceFeeSchedule.type}>
              <PageAcademicYearFinanceFeeSchedule {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.academicYearFinanceFeeSchedulesNew.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.academicYearFinanceFeeSchedulesNew.type}>
              <PageNewAcademicYearFinanceFeeSchedule {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.financeFeeTypes.path}
          component={() => (
            <LayoutRoute type={ROUTES.financeFeeTypes.type}>
              <PageFinanceFeeTypes />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.financeFeeTypesNew.path}
          component={() => (
            <LayoutRoute type={ROUTES.financeFeeTypesNew.type}>
              <PageNewFinanceFeeType />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.financeFeeType.path}
          component={(props) => (
            <LayoutRoute type={ROUTES.financeFeeType.type}>
              <PageFinanceFeeType {...props} />
            </LayoutRoute>
          )}
        />
        <Route
          path={ROUTES.signIn.path}
          component={() => (
            <LayoutRoute type={ROUTES.signIn.type}>
              <PageSignIn />
            </LayoutRoute>
          )}
        />
      </Router>
    </LayoutRoutes>
  );
}
