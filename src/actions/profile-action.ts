'use server';

import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    company: z.string().min(2, { message: 'Company name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export type ProfileFormState = {
    success: boolean;
    errors?: {
        name?: string[];
        company?: string[];
        email?: string[];
    };
    message?: string;
};

export async function submitProfileRequest(prevState: ProfileFormState, formData: FormData): Promise<ProfileFormState> {
    // Simulate delay for "Authentication" feel
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Access Denied. Please verify your credentials.',
        };
    }

    // Here you would typically email the file or log the lead
    console.log('Corporate Profile Request:', validatedFields.data);

    return {
        success: true,
        message: 'Identity Verified. Access Granted.',
        errors: {},
    };
}
