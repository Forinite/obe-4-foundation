//app/(components)/adminComponents/Gallery/modals/AddGalleryImageModal.tsx

'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { addGalleryImages } from '@/app/actions/gallery';
import Modal from '@/app/admin/components/Modal';
import { ImageIcon, Upload, Loader2, CheckCircle } from 'lucide-react';

export default function AddGalleryImageModal({
                                                 isOpen,
                                                 onClose,
                                                 onSuccess,
                                             }: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_FILES = 5;

    const addFiles = (newFiles: FileList | File[]) => {
        const allFiles = [...files, ...Array.from(newFiles)];

        if (allFiles.length > MAX_FILES) {
            setError(`You can only upload up to ${MAX_FILES} images. Extra files were ignored.`);
        } else {
            setError(null);
        }

        const limitedFiles = allFiles.slice(0, MAX_FILES);
        setFiles(limitedFiles);
        setPreviews(limitedFiles.map((f) => URL.createObjectURL(f)));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) addFiles(e.target.files);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        addFiles(e.dataTransfer.files);
    };

    const uploadSingleImage = async (file: File) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                // Simulate progress if addGalleryImages doesn't support progress
                // You can modify this to hook into an actual upload API with progress events
                const interval = setInterval(() => {
                    setProgress((prev) => {
                        const current = prev[file.name] || 0;
                        if (current >= 90) {
                            clearInterval(interval);
                            return prev;
                        }
                        return { ...prev, [file.name]: current + 10 };
                    });
                }, 200);

                await addGalleryImages([file]);
                clearInterval(interval);
                setProgress((prev) => ({ ...prev, [file.name]: 100 }));
                resolve();
            } catch (err) {
                setProgress((prev) => ({ ...prev, [file.name]: 0 }));
                reject(err);
            }
        });
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('Please select at least one image.');
            return;
        }

        setLoading(true);
        setError(null);
        setProgress({});

        try {
            for (const file of files) {
                await uploadSingleImage(file);
            }

            onSuccess();
            onClose();
            setFiles([]);
            setPreviews([]);
            setProgress({});
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload some images.');
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index: number) => {
        const updatedFiles = [...files];
        const updatedPreviews = [...previews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        setError(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Gallery Images">
            <div className="space-y-6">
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        files.length
                            ? 'border-cyan-500 bg-cyan-50/30 dark:bg-cyan-950/20'
                            : 'border-gray-300 hover:border-cyan-400 dark:border-gray-600'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                >
                    {previews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3 justify-items-center">
                            {previews.map((src, i) => {
                                const file = files[i];
                                const progressValue = progress[file.name] || 0;
                                const isDone = progressValue === 100;

                                return (
                                    <div key={i} className="relative group w-[100px]">
                                        <Image
                                            src={src}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="rounded-lg object-cover shadow-md"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(i);
                                            }}
                                            className="absolute top-1 right-1 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            ✕
                                        </button>

                                        {/* Progress Bar */}
                                        {loading && (
                                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200 rounded-b-lg overflow-hidden">
                                                <div
                                                    className={`h-full ${
                                                        isDone ? 'bg-green-500' : 'bg-cyan-500'
                                                    } transition-all duration-200`}
                                                    style={{ width: `${progressValue}%` }}
                                                ></div>
                                            </div>
                                        )}

                                        {/* Completed Check Icon */}
                                        {isDone && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                                                <CheckCircle className="text-green-400 w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-3 text-gray-500 dark:text-gray-400">
                            <ImageIcon className="w-12 h-12" />
                            <p className="text-sm font-medium">
                                Drag & drop or <span className="text-cyan-600">browse</span>
                            </p>
                            <p className="text-xs text-gray-400">Up to {MAX_FILES} images (JPG, PNG, WEBP)</p>
                        </div>
                    )}

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        hidden
                    />
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                    onClick={handleUpload}
                    disabled={files.length === 0 || loading}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4" /> Upload {files.length} image
                            {files.length !== 1 ? 's' : ''}
                        </>
                    )}
                </button>
            </div>
        </Modal>
    );
}
