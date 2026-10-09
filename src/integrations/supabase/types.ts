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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          area: string
          created_at: string
          customer: string
          end_date: string
          id: string
          location: string
          number: string
          signatory: string
          start_date: string
          system: string
          warranty: string
          work: string
        }
        Insert: {
          area?: string
          created_at?: string
          customer?: string
          end_date?: string
          id?: string
          location?: string
          number?: string
          signatory?: string
          start_date?: string
          system?: string
          warranty?: string
          work?: string
        }
        Update: {
          area?: string
          created_at?: string
          customer?: string
          end_date?: string
          id?: string
          location?: string
          number?: string
          signatory?: string
          start_date?: string
          system?: string
          warranty?: string
          work?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string
          id: string
          leakage_area: string
          location: string
          media: string[]
          message: string
          name: string
          notes: string
          phone: string
          property_type: string
          service: string
          source: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          leakage_area?: string
          location?: string
          media?: string[]
          message?: string
          name: string
          notes?: string
          phone: string
          property_type?: string
          service?: string
          source?: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          leakage_area?: string
          location?: string
          media?: string[]
          message?: string
          name?: string
          notes?: string
          phone?: string
          property_type?: string
          service?: string
          source?: string
          status?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          after_images: string[]
          before_images: string[]
          completion_date: string
          created_at: string
          id: string
          inspection: string
          location: string
          name: string
          problem: string
          progress_images: string[]
          result: string
          service: string
          treatment: string
        }
        Insert: {
          after_images?: string[]
          before_images?: string[]
          completion_date?: string
          created_at?: string
          id?: string
          inspection?: string
          location?: string
          name: string
          problem?: string
          progress_images?: string[]
          result?: string
          service?: string
          treatment?: string
        }
        Update: {
          after_images?: string[]
          before_images?: string[]
          completion_date?: string
          created_at?: string
          id?: string
          inspection?: string
          location?: string
          name?: string
          problem?: string
          progress_images?: string[]
          result?: string
          service?: string
          treatment?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          id: string
          media: string[]
          name: string
          rating: number
          service: string
          source: string
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          media?: string[]
          name: string
          rating?: number
          service?: string
          source?: string
          text?: string
        }
        Update: {
          created_at?: string
          id?: string
          media?: string[]
          name?: string
          rating?: number
          service?: string
          source?: string
          text?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          image_url: string | null
          short: string
          slug: string
          solution: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          image_url?: string | null
          short?: string
          slug: string
          solution?: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          image_url?: string | null
          short?: string
          slug?: string
          solution?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          data: Json
          id: string
          updated_at: string
        }
        Insert: {
          data?: Json
          id?: string
          updated_at?: string
        }
        Update: {
          data?: Json
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_exists: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
