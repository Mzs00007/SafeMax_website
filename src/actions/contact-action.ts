'use server';

import { z } from 'zod';

const schema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
    serviceType: z.enum(['fire', 'security', 'amc', 'emergency'] as const, {
        message: 'Please select a service type.',
    }),
});

export type ContactFormState = {
    success: boolean;
    errors?: {
        name?: string[];
        phone?: string[];
        serviceType?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
    message?: string;
};

export async function submitRapidResponse(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        serviceType: formData.get('serviceType'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please fix the errors below.',
        };
    }

    // Here you would typically save the data to a database or send an email.
    console.log('Rapid Response Request:', validatedFields.data);

    return {
        success: true,
        message: 'Technician Dispatch Alert Initiated. Our team will contact you within 15 minutes.',
        errors: {},
    };
}

// --- GENERAL CONTACT FORM ---

const generalSchema = z.object({
    name: z.string().min(2, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Valid email is required.' }),
    subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitGeneralInquiry(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const validatedFields = generalSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your inputs.',
        };
    }

    console.log('General Inquiry:', validatedFields.data);

    return {
        success: true,
        message: 'Message sent successfully. We will respond within 24 hours.',
        errors: {},
    };
}
