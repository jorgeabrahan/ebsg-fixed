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
import { IconList } from "../icons/IconList";
import { IconPlus } from "../icons/IconPlusCircle";

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
        className={`mr-4 [&>div]:h-screen fixed top-0 overflow-y-auto -translate-x-full transition-transform duration-500 md:translate-0 md:sticky md:float-left [&>div]:bg-dark-925/80 xl:w-80 sidebar ${showSidebar && "translate-x-0"}`}
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
            <SidebarCollapse
              className={"font-semibold"}
              label="Estudiantes"
              icon={() => IconCommunity({ strokeWidth: 2 })}
              open
            >
              <SidebarItem
                icon={() => IconList({ width: 17, height: 17 })}
                href={ROUTES.students.path}
              >
                Ver todos
              </SidebarItem>
              <SidebarItem
                icon={() => IconPlus({ width: 17, height: 17 })}
                href={ROUTES.studentsNew.path}
              >
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse
              className={"font-semibold"}
              label="Contactos"
              icon={() => IconPhone({ strokeWidth: 2 })}
              open
            >
              <SidebarItem
                icon={() => IconList({ width: 17, height: 17 })}
                href={ROUTES.contacts.path}
              >
                Ver todos
              </SidebarItem>
              <SidebarItem
                icon={() => IconPlus({ width: 17, height: 17 })}
                href={ROUTES.contactsNew.path}
              >
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse
              className={"font-semibold"}
              label="Años academicos"
              icon={() => IconCalendar({ strokeWidth: 2 })}
              open
            >
              <SidebarItem
                icon={() => IconList({ width: 17, height: 17 })}
                href={ROUTES.academicYears.path}
              >
                Ver todos
              </SidebarItem>
              <SidebarItem
                icon={() => IconPlus({ width: 17, height: 17 })}
                href={ROUTES.academicYearsNew.path}
              >
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse
              className={"font-semibold"}
              label="Grados"
              icon={() => IconGraduationCap({ strokeWidth: 2 })}
              open
            >
              <SidebarItem
                icon={() => IconList({ width: 17, height: 17 })}
                href={ROUTES.schoolGrades.path}
              >
                Ver todos
              </SidebarItem>
              <SidebarItem
                icon={() => IconPlus({ width: 17, height: 17 })}
                href={ROUTES.schoolGradesNew.path}
              >
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse
              className={"font-semibold"}
              label="Tipos de pago"
              icon={() => IconLotOfCash({ strokeWidth: 2 })}
              open
            >
              <SidebarItem
                icon={() => IconList({ width: 17, height: 17 })}
                href={ROUTES.financeFeeTypes.path}
              >
                Ver todos
              </SidebarItem>
              <SidebarItem
                icon={() => IconPlus({ width: 17, height: 17 })}
                href={ROUTES.financeFeeTypesNew.path}
              >
                Crear nuevo
              </SidebarItem>
            </SidebarCollapse>
          </SidebarItemGroup>
          <SidebarItemGroup>
            <SidebarItem
              className={"font-semibold"}
              href="#"
              icon={() => IconLogOut({ strokeWidth: 2 })}
            >
              Cerrar sesión
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </>
  );
}
