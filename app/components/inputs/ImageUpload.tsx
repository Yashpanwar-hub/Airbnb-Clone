'use client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        try {
            console.log("Upload result:", result); // Log full result for debugging
            
            if (!result?.info?.secure_url) {
                throw new Error('No secure URL received from Cloudinary');
            }
            
            const secureUrl = result.info.secure_url;
            console.log("Uploaded Image URL:", secureUrl);
            onChange(secureUrl);
        } catch (error) {
            console.error("Upload error:", error);
            // You might want to add some error UI feedback here
        }
    }, [onChange]);

    const handleError = useCallback((error: any) => {
        console.error("Upload error:", error);
        // Add error UI feedback
    }, []);

    return (
        <CldUploadWidget
            uploadPreset="xwv2ghpn"
            options={{ 
                maxFiles: 1,
                maxFileSize: 5000000, // 5MB
                resourceType: "image",
                clientAllowedFormats: ["jpeg", "png", "jpg", "webp"],
            }}
            onSuccess={handleUpload}
            onError={handleError}
        >
            {({ open }) => (
                <div 
                    onClick={() => open?.()} 
                    className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                >
                    <TbPhotoPlus size={50} />
                    <div className="font-semibold text-lg">Click to upload</div>
                    {value && (
                        <div className="absolute inset-0 w-full h-full">
                            <Image 
                                alt="Upload" 
                                fill 
                                style={{ objectFit: 'cover' }} 
                                src={value}
                                onError={(e) => {
                                    console.error("Image loading error:", e);
                                    // You might want to add fallback UI here
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </CldUploadWidget>
    );
}

export default ImageUpload;