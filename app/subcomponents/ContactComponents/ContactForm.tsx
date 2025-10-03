//app/subcomponents/ContactComponents/ContactForm.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    privacy: boolean;
}

interface ContactFormProps {
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        privacy: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const errorRegionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (error && errorRegionRef.current) {
            errorRegionRef.current.focus();
        }
    }, [error]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            setError('Please fill out all required fields.');
            setIsSubmitting(false);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            setIsSubmitting(false);
            return;
        }
        if (!formData.privacy) {
            setError('You must agree to the Privacy Policy and Terms of Service.');
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || 'Failed to send message.');
            }

            setSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '', privacy: false });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={cn(
                'bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 sm:p-8',
                className,
            )}
        >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Partner With Our Mission</h2>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2 cursor-default select-none">
                            First Name *
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 cursor-text"
                            placeholder="John"
                            required
                            aria-describedby={error ? 'error-message' : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2 cursor-default select-none">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 cursor-text"
                            placeholder="Doe"
                            required
                            aria-describedby={error ? 'error-message' : undefined}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 cursor-default select-none">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 cursor-text"
                        placeholder="john.doe@example.com"
                        required
                        aria-describedby={error ? 'error-message' : undefined}
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 cursor-default select-none">
                        Subject *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 cursor-text"
                        placeholder="Partnership opportunity, volunteer inquiry, donation, etc."
                        required
                        aria-describedby={error ? 'error-message' : undefined}
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 cursor-default select-none">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 resize-none cursor-text"
                        placeholder="Tell us how you’d like to support our mission or get involved..."
                        required
                        aria-describedby={error ? 'error-message' : undefined}
                    />
                </div>
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        className="h-4 w-4 text-cyan-400 focus:ring-cyan-400/50 border-neutral-300 rounded cursor-pointer"
                        required
                        aria-describedby={error ? 'error-message' : undefined}
                    />
                    <label htmlFor="privacy" className="text-sm text-foreground/70 cursor-pointer select-none">
                        I agree to the{' '}
                        <a href="/privacy" className="text-cyan-400 hover:underline">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="/terms" className="text-cyan-400 hover:underline">
                            Terms of Service
                        </a>
                    </label>
                </div>
                {error && (
                    <div
                        id="error-message"
                        ref={errorRegionRef}
                        className="text-red-500 text-sm"
                        role="alert"
                        tabIndex={-1}
                    >
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-green-500 text-sm" role="alert">
                        Message sent successfully!
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        'w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-400/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2',
                        { 'cursor-wait': isSubmitting },
                    )}
                    aria-busy={isSubmitting}
                >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
            </form>
        </div>
    );
};

export default ContactForm;