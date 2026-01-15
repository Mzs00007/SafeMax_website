'use server';

import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2, { message: 'Name is required' }),
    phone: z.string().min(10, { message: 'Valid phone required' }),
    requestType: z.enum(['fire-expert', 'security-audit']),
});

export type ServiceFormState = {
    success: boolean;
    errors?: {
        name?: string[];
        phone?: string[];
        requestType?: string[];
    };
    message?: string;
};

export async function submitServiceRequest(prevState: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        requestType: formData.get('requestType'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your inputs.',
        };
    }

    // Logic to route request based on type
    const typeLabel = validatedFields.data.requestType === 'fire-expert' ? 'Fire Engineer' : 'Security Auditor';
    console.log(`New [${typeLabel}] Request:`, validatedFields.data);

    return {
        success: true,
        message: 'Request received. Our expert will call you shortly.',
        errors: {},
    };
}
