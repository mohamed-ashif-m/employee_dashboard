// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ongldqocyjecvmywsbkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZ2xkcW9jeWplY3ZteXdzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDYxODQsImV4cCI6MjA2ODA4MjE4NH0.9DsQX2EC-O2Khd1t4xA-9aJrBpCp9Cqz6X-iNexhA6A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
