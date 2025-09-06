import {createClient} from "https://esm.sh/@supabase/supabase-js"

const supabaseUrl='https://aksqwdmysadbqcoymbjt.supabase.co'
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrc3F3ZG15c2FkYnFjb3ltYmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMjc4ODIsImV4cCI6MjA3MjcwMzg4Mn0.dUOZ4Fp5o9uO1RQMx5QxqglZKRobRg11bWxxLgaI3uM"
const supabaseClient = createClient(supabaseUrl, supabaseKey)


export async function getLevelSet(levelId) {
    const {data, error} = await supabaseClient
    .from("real_levels")
    .select("grid")
    .eq("Id", levelId)
    .single()

    if (error) {
        console.error("Error fetching level:", error);
        return null;
    }

    return data.grid
}