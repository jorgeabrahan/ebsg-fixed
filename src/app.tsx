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
import { PageStudentContact } from "./pages/students/student_contacts/PageStudentContact";
import { PageNewStudentContact } from "./pages/students/student_contacts/PageNewStudentContact";

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
