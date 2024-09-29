import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://lnuqlwcfdxstcdbjfyun.supabase.co/", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudXFsd2NmZHhzdGNkYmpmeXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMDAxOTcsImV4cCI6MjA0MjY3NjE5N30.a2Ds7gucyJyQr1l5frs7tfHQbZZkZeLK31s5AEy9jjo"
);

export default supabase;