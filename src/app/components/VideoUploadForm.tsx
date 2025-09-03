"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Upload, Video, FileText, Image, CheckCircle } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const watchedTitle = watch("title");
  const watchedDescription = watch("description");

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    setVideoUploaded(true);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
      setVideoUploaded(false);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = watchedTitle && watchedDescription && videoUploaded;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-4">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-base-content mb-2">Upload Your Video</h1>
        <p className="text-base-content/70">Share your content with the world</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Video Upload Section */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Video File</h2>
                <p className="text-sm text-base-content/60">Upload your video content</p>
              </div>
              {videoUploaded && (
                <div className="ml-auto">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              )}
            </div>
            
            <FileUpload
              fileType="video"
              onSuccess={handleUploadSuccess}
              onProgress={handleUploadProgress}
            />
            
            {uploadProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-base-content/70 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-base-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Details Section */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-info" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Video Details</h2>
                <p className="text-sm text-base-content/60">Add title and description</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    Title
                    <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-base-content/50">
                    {watchedTitle?.length || 0}/100
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging title for your video"
                  maxLength={100}
                  className={`input input-bordered input-lg w-full transition-all duration-200 ${
                    errors.title 
                      ? "input-error focus:input-error" 
                      : "focus:input-primary focus:border-primary/50"
                  }`}
                  {...register("title", { 
                    required: "Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                    maxLength: { value: 100, message: "Title must be less than 100 characters" }
                  })}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <span className="w-1 h-1 bg-error rounded-full"></span>
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Description Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    Description
                    <span className="text-error">*</span>
                  </span>
                  <span className="label-text-alt text-base-content/50">
                    {watchedDescription?.length || 0}/500
                  </span>
                </label>
                <textarea
                  placeholder="Describe your video content, what viewers can expect to learn or see..."
                  maxLength={500}
                  rows={4}
                  className={`textarea textarea-bordered textarea-lg w-full resize-none transition-all duration-200 ${
                    errors.description 
                      ? "textarea-error focus:textarea-error" 
                      : "focus:textarea-primary focus:border-primary/50"
                  }`}
                  {...register("description", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                    maxLength: { value: 500, message: "Description must be less than 500 characters" }
                  })}
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <span className="w-1 h-1 bg-error rounded-full"></span>
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="card bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <div className="card-body">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-base-content">Ready to Publish?</h3>
              <p className="text-sm text-base-content/60">
                Make sure all fields are filled and your video is uploaded
              </p>
            </div>

            {/* Form Validation Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`flex items-center gap-2 p-3 rounded-lg ${videoUploaded ? 'bg-success/10 text-success' : 'bg-base-200 text-base-content/50'}`}>
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">Video Upload</span>
                {videoUploaded && <CheckCircle className="w-4 h-4 ml-auto" />}
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg ${watchedTitle ? 'bg-success/10 text-success' : 'bg-base-200 text-base-content/50'}`}>
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Title</span>
                {watchedTitle && <CheckCircle className="w-4 h-4 ml-auto" />}
              </div>
              <div className={`flex items-center gap-2 p-3 rounded-lg ${watchedDescription ? 'bg-success/10 text-success' : 'bg-base-200 text-base-content/50'}`}>
                <Image className="w-4 h-4" />
                <span className="text-sm font-medium">Description</span>
                {watchedDescription && <CheckCircle className="w-4 h-4 ml-auto" />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`btn btn-lg w-full transition-all duration-300 ${
                isFormValid 
                  ? 'btn-primary hover:btn-primary hover:scale-[1.02] shadow-lg hover:shadow-xl' 
                  : 'btn-disabled'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Publishing Video...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Publish Video
                </>
              )}
            </button>

            {!isFormValid && (
              <p className="text-center text-sm text-base-content/60 mt-2">
                Complete all required fields to publish your video
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}