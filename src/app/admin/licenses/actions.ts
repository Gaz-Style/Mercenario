'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getLicensesAction() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('client_licenses')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching licenses:', error.message, '| Code:', error.code);
        return [];
    }
    return data;
}

export async function createLicenseAction(formData: FormData) {
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
        console.error('Error creating license:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/licenses');
    return { success: true };
}

export async function updateLicenseStatusAction(id: string, status: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('client_licenses')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating license status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/licenses');
    return { success: true };
}
