'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getDeploymentsAction() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('deployment_orders')
        .select(`
            *,
            license:client_licenses (
                client_name,
                niche_type,
                plan_name
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching deployments:', error.message, '| Code:', error.code, '| Details:', error.details);
        return [];
    }
    return data;
}

export async function createDeploymentAction(license_id: string, assigned_tech: string) {
    const supabase = await createClient();
    
    const { error } = await supabase
        .from('deployment_orders')
        .insert([{
            license_id,
            assigned_tech,
            status: 'pending',
            started_at: new Date().toISOString()
        }]);

    if (error) {
        console.error('Error creating deployment:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/deployments');
    return { success: true };
}

export async function updateDeploymentStatusAction(id: string, status: string) {
    const supabase = await createClient();
    
    const updateData: any = { status, updated_at: new Date().toISOString() };
    if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
    }

    const { error } = await supabase
        .from('deployment_orders')
        .update(updateData)
        .eq('id', id);

    if (error) {
        console.error('Error updating deployment status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/deployments');
    return { success: true };
}
