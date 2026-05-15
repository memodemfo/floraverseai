from supabase import create_client

SUPABASE_URL = "https://hsolrnfscfhqpafqknnj.supabase.co"

SUPABASE_KEY = "sb_publishable_81_UX4BB4c3Ypc_PNdSdHA_-znLkY_D"

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)