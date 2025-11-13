import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fungsi untuk menyimpan device data
export const saveDeviceData = async (deviceKey, pinsData) => {
  try {
    const { data, error } = await supabase
      .from('device_data')
      .insert({
        device_key: deviceKey,
        pins: pinsData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error saving to Supabase:', error);
    return { success: false, error };
  }
};