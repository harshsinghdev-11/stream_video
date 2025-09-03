"use client";

import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { useState, useRef, useCallback } from "react";
import { 
  Upload, 
  FileVideo, 
  FileImage, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  X,
  Film,
  Image as ImageIcon
} from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
  maxSize?: number; // in MB
  title?: string;
  description?: string;
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
  maxSize = fileType === "video" ? 100 : 5,
  title,
  description
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = fileType === "video" 
    ? "video/mp4,video/webm,video/ogg,video/avi,video/mov" 
    : "image/jpeg,image/png,image/webp,image/gif";

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    return fileType === "video" ? FileVideo : FileImage;
  };

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
    setProgress(0);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    setUploadComplete(true);
    setTimeout(() => {
      onSuccess(response);
    }, 1500);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
    setUploadComplete(false);
    setProgress(0);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      setProgress(Math.round(percentComplete));
      if (onProgress) {
        onProgress(Math.round(percentComplete));
      }
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`Video size must be less than ${maxSize}MB`);
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return false;
      }
    }
    setSelectedFile(file);
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        // Trigger the hidden input to simulate file selection
        if (fileInputRef.current) {
          const dt = new DataTransfer();
          dt.items.add(file);
          fileInputRef.current.files = dt.files;
        }
      }
    }
  }, [fileType, maxSize]);

  const clearSelection = () => {
    setSelectedFile(null);
    setError(null);
    setUploadComplete(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const FileIcon = getFileIcon();

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && (
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.02]'
            : uploadComplete
            ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20'
            : error
            ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8">
          {/* Upload Complete State */}
          {uploadComplete ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                Upload Complete!
              </h4>
              <p className="text-emerald-600 dark:text-emerald-400">
                Your {fileType} has been successfully uploaded
              </p>
            </div>
          ) : uploading ? (
            /* Uploading State */
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                Uploading {selectedFile?.name}
              </h4>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400">
                <span className="text-2xl font-bold">{progress}%</span>
                <span className="text-sm">({formatFileSize(selectedFile?.size || 0)})</span>
              </div>
            </div>
          ) : (
            /* Upload Interface */
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${
                isDragOver 
                  ? 'bg-indigo-100 dark:bg-indigo-900/30' 
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                {isDragOver ? (
                  <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  fileType === "video" ? (
                    <Film className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  )
                )}
              </div>

              {selectedFile ? (
                /* File Selected */
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 mb-4">
                    <div className="flex items-center gap-3">
                      <FileIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      <div className="text-left">
                        <p className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={clearSelection}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Drop Zone */
                <>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {isDragOver ? `Drop your ${fileType} here` : `Upload ${fileType}`}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Drag and drop your file here, or click to browse
                  </p>
                </>
              )}

              {/* File Constraints */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span>Max size: {maxSize}MB</span>
                <span>•</span>
                <span>
                  {fileType === "video" 
                    ? "MP4, WebM, OGG, AVI, MOV" 
                    : "JPEG, PNG, WebP, GIF"
                  }
                </span>
              </div>

              {/* Upload Button */}
              <div className="relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/25"
                  disabled={uploading}
                >
                  <span className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    {selectedFile ? 'Upload File' : 'Choose File'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Hidden Input */}
          <IKUpload
            ref={fileInputRef}
            fileName={fileType === "video" ? "video" : "image"}
            onError={onError}
            onSuccess={handleSuccess}
            onUploadStart={handleStartUpload}
            onUploadProgress={handleProgress}
            accept={acceptedTypes}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            validateFile={validateFile}
            useUniqueFileName={true}
            folder={fileType === "video" ? "/videos" : "/images"}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <h5 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
          💡 Upload Tips
        </h5>
        <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          {fileType === "video" ? (
            <>
              <li>• Best quality: 1080p or higher resolution</li>
              <li>• Recommended formats: MP4, WebM for best compatibility</li>
              <li>• Keep file size under {maxSize}MB for faster uploads</li>
            </>
          ) : (
            <>
              <li>• Best quality: High resolution images (1920px+ width)</li>
              <li>• Recommended formats: JPEG for photos, PNG for graphics</li>
              <li>• WebP format offers great quality with smaller file sizes</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}