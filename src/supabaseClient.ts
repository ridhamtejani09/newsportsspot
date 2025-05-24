import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjqafkegyufbtbusrxuv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcWFma2VneXVmYnRidXNyeHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzA1ODUsImV4cCI6MjA2MzY0NjU4NX0.yP-i41kSH9yBOJKOch668qKWIAiGr9T_3LywLp2fwO8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 