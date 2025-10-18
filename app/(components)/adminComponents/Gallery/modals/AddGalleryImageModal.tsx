//app/(components)/adminComponents/Gallery/modals/AddGalleryImageModal.tsx
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { addGalleryImage } from '@/app/actions/gallery';
import Modal from '@/app/admin/components/Modal';
import { Plus, Upload, ImageIcon, Loader2 } from 'lucide-react';

export default function AddGalleryImageModal({
                                                 isOpen,
                                                 onClose,
                                                 onSuccess
                                             }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        try {
            await addGalleryImage(file);
            onSuccess();
            onClose();
            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error('Failed to upload image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files[0];
        if (dropped) {
            setFile(dropped);
            setPreview(URL.createObjectURL(dropped));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Gallery Image">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        file
                            ? 'border-cyan-500 bg-cyan-50/30 dark:bg-cyan-950/20'
                            : 'border-gray-300 hover:border-cyan-400 dark:border-gray-600'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                >
                    {preview ? (
                        <div className="flex flex-col items-center space-y-3">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={160}
                                height={160}
                                className="rounded-lg object-cover shadow-md"
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {file?.name}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-3 text-gray-500 dark:text-gray-400">
                            <ImageIcon className="w-12 h-12" />
                            <p className="text-sm font-medium">
                                Drag & drop or <span className="text-cyan-600">browse</span>
                            </p>
                            <p className="text-xs text-gray-400">
                                Supported formats: JPG, PNG, WEBP
                            </p>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || loading}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                        </>
                    ) : (
                        <>
                            <Plus className="w-4 h-4" /> Add Image
                        </>
                    )}
                </button>
            </form>
        </Modal>
    );
}
