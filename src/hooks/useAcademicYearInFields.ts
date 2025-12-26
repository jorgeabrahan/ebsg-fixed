import { useEffect, useState } from "preact/hooks";
import { ServiceCRUD } from "../services/ServiceCRUD";
import type { Tables } from "../lib/types/database.types";
import type { FormDefinition } from "../lib/types/forms";

export const useAcademicYearInFields = (academicYearId?: string) => {
  const [academicYear, setAcademicYear] = useState<Pick<
    Tables<"school_academic_years">,
    "id" | "year_label"
  > | null>(null);
  useEffect(() => {
    const fetchAcademicYear = async (id: string) => {
      const { data, isSuccess } = await ServiceCRUD.readOne(
        "school_academic_years",
        {
          id: Number(id),
          select: "id, year_label",
        },
      );
      if (!isSuccess || !data) {
        return;
      }
      setAcademicYear(data);
    };
    if (!academicYearId) {
      return;
    }
    fetchAcademicYear(academicYearId);
  }, [academicYearId]);
  const populateAcademicYearInFields = (
    fields: FormDefinition["fields"],
  ): FormDefinition["fields"] => {
    return fields.map((f) => {
      if (f.id != "year_id") return f;
      return {
        ...f,
        value: academicYear?.year_label,
        reference: academicYear?.id?.toString(),
      };
    });
  };

  return {
    populateAcademicYearInFields,
    academicYear,
  };
};
