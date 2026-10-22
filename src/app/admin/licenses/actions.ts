'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getLicensesAction() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('client_licenses')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('[Licenses] Supabase notice:', error.message);
            return [];
        }
        return data || [];
    } catch (err: any) {
        console.warn('[Licenses] Offline or unreachable database:', err?.message || err);
        return [];
    }
}

export async function createLicenseAction(formData: FormData) {
    try {
        const supabase = await createClient();
        
        const client_name = formData.get('client_name') as string;
        const client_email = formData.get('client_email') as string;
        const client_phone = formData.get('client_phone') as string;
        const niche_type = formData.get('niche_type') as string;
        const plan_name = formData.get('plan_name') as string;
        const plan_price_clp = parseInt(formData.get('plan_price_clp') as string) || 0;

        const { error } = await supabase
            .from('client_licenses')
            .insert([{
                client_name,
                client_email,
                client_phone,
                niche_type,
                plan_name,
                plan_price_clp,
                status: 'active'
            }]);

        if (error) {
            console.warn('[Licenses] Error creating license:', error.message);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/licenses');
        return { success: true };
    } catch (err: any) {
        console.warn('[Licenses] Database error creating license:', err?.message || err);
        return { success: false, error: err?.message || 'Error de conexión con la base de datos' };
    }
}

export async function updateLicenseStatusAction(id: string, status: string) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from('client_licenses')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.warn('[Licenses] Error updating license status:', error.message);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/licenses');
        return { success: true };
    } catch (err: any) {
        console.warn('[Licenses] Database error updating status:', err?.message || err);
        return { success: false, error: err?.message || 'Error de conexión con la base de datos' };
    }
}
