// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jfvmglavxeumlvpcewxr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmdm1nbGF2eGV1bWx2cGNld3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTU0ODUsImV4cCI6MjA2NTU3MTQ4NX0.ErgeUxBxGvZUbKaaHLSVRiVTnip3Kyq-ueD3GZyLYbU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);