import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { ROUTES } from "../lib/constants/routes";
import { IconCommunity } from "../icons/IconCommunity";
import { IconPhone } from "../icons/IconPhone";
import { IconCalendar } from "../icons/IconCalendar";
import { IconGraduationCap } from "../icons/IconGraduationCap";
import { IconLotOfCash } from "../icons/IconLotOfCash";
import { IconMenu } from "../icons/IconMenu";
import { useState } from "preact/hooks";
import { IconXmark } from "../icons/IconXmark";
import { IconLogOut } from "../icons/IconLogOut";
import { IconBookSolid } from "../icons/IconBookSolid";

export function CSidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <header
        className={
          "flex items-center justify-between gap-2 px-4 w-full bg-gradient-to-b from-dark-925/80 to-dark-950/80 backdrop-blur-xl py-5 md:hidden"
        }
      >
        <div className={"flex items-center gap-2"}>
          <IconBookSolid width={28} height={28} />
          <p className="text-2xl font-bold">EBSG</p>
        </div>
        <button
          className={"[&>*]:pointer-events-none"}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? (
            <IconXmark strokeWidth={2} width={26} height={26} />
          ) : (
            <IconMenu strokeWidth={2} width={26} height={26} />
          )}
        </button>
      </header>
      <Sidebar
        className={`mr-4 [&>div]:h-screen fixed top-0 overflow-y-auto -translate-x-full transition-transform duration-500 md:translate-0 md:sticky md:float-left [&>div]:md:rounded-2xl [&>div]:md:h-[calc(100vh-32px)] [&>div]:md:my-4 [&>div]:md:ml-4 [&>div]:bg-gradient-to-b [&>div]:from-dark-925/60 [&>div]:to-dark-950 [&>div]:backdrop-blur-xl xl:w-80 sidebar ${showSidebar && "translate-x-0"}`}
      >
        <a
          className={"flex items-center gap-2 mb-4 pl-1"}
          href={ROUTES.root.path}
        >
          <IconBookSolid width={28} height={28} />
          <p className="text-2xl font-bold">EBSG</p>
        </a>
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarCollapse label="Estudiantes" icon={IconCommunity}>
              <SidebarItem href={ROUTES.students.path}>Estudiantes</SidebarItem>
              <SidebarItem href={ROUTES.studentsNew.path}>
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse label="Contactos" icon={IconPhone}>
              <SidebarItem href={ROUTES.contacts.path}>Contactos</SidebarItem>
              <SidebarItem href={ROUTES.contactsNew.path}>
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse label="Años academicos" icon={IconCalendar}>
              <SidebarItem href={ROUTES.academicYears.path}>
                Años academicos
              </SidebarItem>
              <SidebarItem href={ROUTES.academicYearsNew.path}>
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse label="Grados" icon={IconGraduationCap}>
              <SidebarItem href={ROUTES.schoolGrades.path}>Grados</SidebarItem>
              <SidebarItem href={ROUTES.schoolGradesNew.path}>
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse label="Tipos de pago" icon={IconLotOfCash}>
              <SidebarItem href={ROUTES.financeFeeTypes.path}>
                Tipos de pagos
              </SidebarItem>
              <SidebarItem href={ROUTES.financeFeeTypesNew.path}>
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem href="#" icon={IconLogOut}>
              Cerrar sesión
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </>
  );
}
