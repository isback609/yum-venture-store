// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qtlezjcyweuputdxpfrt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bGV6amN5d2V1cHV0ZHhwZnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDgyMTMsImV4cCI6MjA1ODkyNDIxM30.QD8EDd_X4Xzrq-6U84rNuiVM3xedusvdlWffSiPZeaM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);