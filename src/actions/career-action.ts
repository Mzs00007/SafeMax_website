'use server';

import { z } from 'zod';

const schema = z.object({
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
    position: z.string().min(2, { message: 'Position is required.' }),
    message: z.string().optional(),
});

export type FormState = {
    success: boolean;
    errors?: {
        fullName?: string[];
        email?: string[];
        phone?: string[];
        position?: string[];
        message?: string[];
        file?: string[];
    };
    message?: string;
};

export async function submitApplication(prevState: FormState, formData: FormData): Promise<FormState> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const validatedFields = schema.safeParse({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        position: formData.get('position'),
        message: formData.get('message'),
    });

    // Manual file validation since zod text schema doesn't handle File objects directly easily without custom logic
    const file = formData.get('cv') as File | null;
    const fileErrors: string[] = [];

    if (!file || file.size === 0 || file.name === 'undefined') {
        // Optional: decide if file is required. Let's make it required.
        fileErrors.push('Please upload your CV.');
    } else {
        if (file.size > 5 * 1024 * 1024) {
            fileErrors.push('File size must be less than 5MB.');
        }
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            fileErrors.push('Only PDF and Word documents are allowed.');
        }
    }

    if (!validatedFields.success || fileErrors.length > 0) {
        return {
            success: false,
            errors: {
                ...validatedFields.success ? {} : validatedFields.error.flatten().fieldErrors,
                ...(fileErrors.length > 0 ? { file: fileErrors } : {}),
            },
            message: 'Please fix the errors below.',
        };
    }

    // Here you would typically save the data to a database or send an email.
    console.log('Application received:', validatedFields.data);

    return {
        success: true,
        message: 'Application submitted successfully! We will be in touch soon.',
        errors: {},
    };
}
