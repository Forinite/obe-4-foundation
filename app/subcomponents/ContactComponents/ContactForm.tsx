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

    // ✨ Particle animation setup
    const [particles, setParticles] = useState(
        Array.from({ length: 25 }).map(() => ({
            id: Math.random(),
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 8 + 5,
        }))
    );

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
                'relative overflow-hidden bg-background/60 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-400/10',
                className,
            )}
        >
            {/* 🌊 Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-600/10 animate-pulse" />

            {/* 🧩 Floating Blobs */}
            <svg
                className="absolute -top-20 -left-16 w-80 h-80 text-cyan-400/20 animate-[spin_40s_linear_infinite]"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M40,-60C55,-45,70,-30,76,-10C82,10,79,35,67,52C55,69,35,78,15,81C-5,84,-25,81,-45,71C-65,61,-85,45,-91,24C-97,3,-89,-22,-75,-41C-61,-60,-41,-73,-21,-78C-1,-83,19,-80,40,-60Z"
                    transform="translate(100 100)"
                />
            </svg>

            <svg
                className="absolute bottom-[-60px] right-[-40px] w-72 h-72 text-blue-500/10 animate-[spin_60s_reverse_linear_infinite]"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M44,-73.2C56.5,-66.3,65.5,-56.3,70.8,-44.5C76.1,-32.7,77.7,-19.2,77.3,-6.4C77,6.4,74.6,19.4,69.3,30.9C64,42.3,55.7,52.1,45.4,60.4C35,68.6,22.5,75.3,8.3,77.5C-5.9,79.8,-21,77.5,-35.3,72.2C-49.7,66.9,-63.3,58.5,-70.7,46.4C-78.2,34.4,-79.5,18.7,-79.6,2.5C-79.7,-13.6,-78.6,-30.1,-71.3,-43.6C-64,-57.1,-50.6,-67.7,-36.5,-73.7C-22.3,-79.7,-7.4,-81.1,6.9,-80.6C21.2,-80.2,35.9,-78.1,44,-73.2Z"
                    transform="translate(100 100)"
                />
            </svg>

            {/* ✨ Particles */}
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400/40 blur-sm"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
                    }}
                />
            ))}

            {/* 💡 CSS for custom keyframes */}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) scale(1); opacity: 0.6; }
                    50% { transform: translateY(-10px) scale(1.1); opacity: 1; }
                    100% { transform: translateY(5px) scale(0.9); opacity: 0.6; }
                }
            `}</style>

            {/* 🌠 Form Content */}
            <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Partner With Our Mission
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <FormInput
                            id="firstName"
                            name="firstName"
                            label="First Name *"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            error={!!error}
                        />
                        <FormInput
                            id="lastName"
                            name="lastName"
                            label="Last Name *"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            error={!!error}
                        />
                    </div>

                    <FormInput
                        id="email"
                        name="email"
                        label="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        error={!!error}
                        type="email"
                    />

                    <FormInput
                        id="subject"
                        name="subject"
                        label="Subject *"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Partnership opportunity, volunteer inquiry, donation, etc."
                        error={!!error}
                    />

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
                            className="w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 resize-none cursor-text"
                            placeholder="Tell us how you’d like to support our mission or get involved..."
                            required
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
                            'relative shimmer-button  overflow-hidden w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2',
                            isSubmitting
                                ? 'bg-cyan-400/50 cursor-wait'
                                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 shadow-md shadow-cyan-400/20 hover:shadow-cyan-400/40',
                        )}
                    >
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>

                        {/* Conditional shimmer animation */}
                        {!isSubmitting && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-40 animate-[shimmer_2s_linear_infinite]" />
                        )}
                    </button>


                </form>
            </div>
        </div>
    );
};

// 🧩 Subcomponent for cleaner inputs
const FormInput = ({
                       id,
                       name,
                       label,
                       value,
                       onChange,
                       placeholder,
                       type = 'text',
                       error,
                   }: any) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2 cursor-default select-none">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={cn(
                'w-full px-4 py-3 bg-accent/50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-300 cursor-text',
                { 'ring-1 ring-red-400': error },
            )}
            placeholder={placeholder}
            required
        />
    </div>
);

export default ContactForm;
