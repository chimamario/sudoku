import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = createClient(supabaseUrl, supabaseKey)


async function getLevelSet(levelId) {
    const {data, error} = await supabaseClient
    .from("levels")
    .select("grid")
    .eq("id", levelId)
    .single()

    if (error) {
        console.error("Error fetching level:", error);
        return null;
    }

    return data.grid
}