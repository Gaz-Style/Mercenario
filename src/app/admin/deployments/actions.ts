'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getDeploymentsAction() {
    try {
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
            console.warn('[Deployments] Supabase notice:', error.message);
            return [];
        }
        return data || [];
    } catch (err: any) {
        console.warn('[Deployments] Offline or unreachable database:', err?.message || err);
        return [];
    }
}

export async function createDeploymentAction(license_id: string, assigned_tech: string) {
    try {
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
            console.warn('[Deployments] Error creating deployment:', error.message);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/deployments');
        return { success: true };
    } catch (err: any) {
        console.warn('[Deployments] Database error creating deployment:', err?.message || err);
        return { success: false, error: err?.message || 'Error de conexión con la base de datos' };
    }
}

export async function updateDeploymentStatusAction(id: string, status: string) {
    try {
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
            console.warn('[Deployments] Error updating deployment status:', error.message);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/deployments');
        return { success: true };
    } catch (err: any) {
        console.warn('[Deployments] Database error updating status:', err?.message || err);
        return { success: false, error: err?.message || 'Error de conexión con la base de datos' };
    }
}
