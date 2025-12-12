export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      finance_charge_adjustments: {
        Row: {
          amount_delta: number
          charge_id: number
          created_at: string | null
          id: number
          reason: string | null
          type: string
        }
        Insert: {
          amount_delta: number
          charge_id: number
          created_at?: string | null
          id?: number
          reason?: string | null
          type: string
        }
        Update: {
          amount_delta?: number
          charge_id?: number
          created_at?: string | null
          id?: number
          reason?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_charge_adjustments_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "finance_charges"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_charges: {
        Row: {
          amount_due: number
          charge_date: string
          created_at: string | null
          created_from_schedule_id: number | null
          description: string | null
          due_date: string | null
          enrollment_id: number
          fee_type_id: number
          grade_snapshot_id: number | null
          id: number
          period_month: number | null
          status: string
        }
        Insert: {
          amount_due: number
          charge_date?: string
          created_at?: string | null
          created_from_schedule_id?: number | null
          description?: string | null
          due_date?: string | null
          enrollment_id: number
          fee_type_id: number
          grade_snapshot_id?: number | null
          id?: number
          period_month?: number | null
          status?: string
        }
        Update: {
          amount_due?: number
          charge_date?: string
          created_at?: string | null
          created_from_schedule_id?: number | null
          description?: string | null
          due_date?: string | null
          enrollment_id?: number
          fee_type_id?: number
          grade_snapshot_id?: number | null
          id?: number
          period_month?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_charges_created_from_schedule_id_fkey"
            columns: ["created_from_schedule_id"]
            isOneToOne: false
            referencedRelation: "finance_fee_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_charges_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "school_enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_charges_fee_type_id_fkey"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "finance_fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_charges_grade_snapshot_id_fkey"
            columns: ["grade_snapshot_id"]
            isOneToOne: false
            referencedRelation: "school_grades"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_fee_schedules: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          fee_type_id: number
          grade_id: number
          id: number
          year_id: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          fee_type_id: number
          grade_id: number
          id?: number
          year_id: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          fee_type_id?: number
          grade_id?: number
          id?: number
          year_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "finance_fee_schedules_fee_type_id_fkey"
            columns: ["fee_type_id"]
            isOneToOne: false
            referencedRelation: "finance_fee_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_fee_schedules_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "school_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_fee_schedules_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "school_academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_fee_types: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
          periodicity: string
          requires_grade: boolean
          requires_month: boolean
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: number
          name: string
          periodicity: string
          requires_grade?: boolean
          requires_month?: boolean
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
          periodicity?: string
          requires_grade?: boolean
          requires_month?: boolean
        }
        Relationships: []
      }
      finance_transaction_allocations: {
        Row: {
          amount_applied: number
          charge_id: number
          created_at: string | null
          id: number
          transaction_id: number
        }
        Insert: {
          amount_applied: number
          charge_id: number
          created_at?: string | null
          id?: number
          transaction_id: number
        }
        Update: {
          amount_applied?: number
          charge_id?: number
          created_at?: string | null
          id?: number
          transaction_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "finance_transaction_allocations_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "finance_charges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_transaction_allocations_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "finance_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      finance_transactions: {
        Row: {
          amount_total: number
          created_at: string | null
          id: number
          method: string | null
          notes: string | null
          payment_date: string
          reference: string | null
          student_id: number
        }
        Insert: {
          amount_total: number
          created_at?: string | null
          id?: number
          method?: string | null
          notes?: string | null
          payment_date?: string
          reference?: string | null
          student_id: number
        }
        Update: {
          amount_total?: number
          created_at?: string | null
          id?: number
          method?: string | null
          notes?: string | null
          payment_date?: string
          reference?: string | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "finance_transactions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "person_students"
            referencedColumns: ["id"]
          },
        ]
      }
      grades: {
        Row: {
          created_at: string
          id: number
          installment: number
          name: string
          tuition: number
        }
        Insert: {
          created_at?: string
          id?: number
          installment: number
          name?: string
          tuition?: number
        }
        Update: {
          created_at?: string
          id?: number
          installment?: number
          name?: string
          tuition?: number
        }
        Relationships: []
      }
      parents: {
        Row: {
          id: number
          name: string
          phone_number: string
        }
        Insert: {
          id?: number
          name?: string
          phone_number?: string
        }
        Update: {
          id?: number
          name?: string
          phone_number?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_paid: number | null
          created_at: string
          grade_name: string
          id: number
          is_tuition_payment: boolean
          month_paid: string
          payment_method: number | null
          student_id: number
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          grade_name?: string
          id?: number
          is_tuition_payment?: boolean
          month_paid: string
          payment_method?: number | null
          student_id: number
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          grade_name?: string
          id?: number
          is_tuition_payment?: boolean
          month_paid?: string
          payment_method?: number | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_payment_method_fkey"
            columns: ["payment_method"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      person_contacts: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: number
          last_name: string | null
          phone: string | null
          relationship: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: number
          last_name?: string | null
          phone?: string | null
          relationship?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: number
          last_name?: string | null
          phone?: string | null
          relationship?: string | null
        }
        Relationships: []
      }
      person_student_contacts: {
        Row: {
          contact_id: number
          created_at: string | null
          id: number
          is_primary: boolean | null
          relation_type: string | null
          student_id: number
        }
        Insert: {
          contact_id: number
          created_at?: string | null
          id?: number
          is_primary?: boolean | null
          relation_type?: string | null
          student_id: number
        }
        Update: {
          contact_id?: number
          created_at?: string | null
          id?: number
          is_primary?: boolean | null
          relation_type?: string | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_student_contacts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "person_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_student_contacts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "person_students"
            referencedColumns: ["id"]
          },
        ]
      }
      person_students: {
        Row: {
          birth_date: string | null
          code: string | null
          created_at: string | null
          first_name: string
          gender: string | null
          id: number
          last_name: string
          status: string | null
        }
        Insert: {
          birth_date?: string | null
          code?: string | null
          created_at?: string | null
          first_name: string
          gender?: string | null
          id?: number
          last_name: string
          status?: string | null
        }
        Update: {
          birth_date?: string | null
          code?: string | null
          created_at?: string | null
          first_name?: string
          gender?: string | null
          id?: number
          last_name?: string
          status?: string | null
        }
        Relationships: []
      }
      school_academic_years: {
        Row: {
          end_date: string
          id: number
          is_active: boolean | null
          start_date: string
          year_label: string
        }
        Insert: {
          end_date: string
          id?: number
          is_active?: boolean | null
          start_date: string
          year_label: string
        }
        Update: {
          end_date?: string
          id?: number
          is_active?: boolean | null
          start_date?: string
          year_label?: string
        }
        Relationships: []
      }
      school_enrollments: {
        Row: {
          created_at: string | null
          enrollment_date: string
          grade_id: number
          id: number
          section: string | null
          status: string | null
          student_id: number
          year_id: number
        }
        Insert: {
          created_at?: string | null
          enrollment_date?: string
          grade_id: number
          id?: number
          section?: string | null
          status?: string | null
          student_id: number
          year_id: number
        }
        Update: {
          created_at?: string | null
          enrollment_date?: string
          grade_id?: number
          id?: number
          section?: string | null
          status?: string | null
          student_id?: number
          year_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "school_enrollments_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "school_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "person_students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "school_enrollments_year_id_fkey"
            columns: ["year_id"]
            isOneToOne: false
            referencedRelation: "school_academic_years"
            referencedColumns: ["id"]
          },
        ]
      }
      school_grades: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string
          grade_id: number
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          grade_id: number
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          grade_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_grade_id_fkey"
            columns: ["grade_id"]
            isOneToOne: false
            referencedRelation: "grades"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_student_payment_years: {
        Args: { s_id: number; year: number }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
