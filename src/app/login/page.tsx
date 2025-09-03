"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            
            if (result?.error) {
                showNotification(result.error, "error");
            } else {
                showNotification("Login successful!", "success");
                router.push("/reelScroll");
            }
        } catch (error) {
            showNotification("An unexpected error occurred", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h1>
                    <p className="text-base-content/60">Sign in to continue your video journey</p>
                </div>

                {/* Login Form */}
                <div className="card bg-base-100 shadow-xl border border-base-200/50">
                    <div className="card-body p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text font-medium">Email Address</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className="input input-bordered input-lg w-full pr-12 focus:input-primary transition-all duration-200"
                                        disabled={isLoading}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg className="w-5 h-5 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="password">
                                    <span className="label-text font-medium">Password</span>
                                   
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter your password"
                                        className="input input-bordered input-lg w-full pr-12 focus:input-primary transition-all duration-200"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors disabled:cursor-not-allowed"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="checkbox checkbox-primary"
                                        disabled={isLoading}
                                    />
                                    <span className="label-text">Remember me for 30 days</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !email || !password}
                                className="btn btn-primary btn-lg w-full transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        

                        {/* Divider */}
                        <div className="divider my-6">
                            <span className="text-base-content/40 text-sm">New to our platform?</span>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <Link 
                                href="/register" 
                                className="btn btn-ghost btn-lg w-full hover:bg-base-200 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="text-center mt-8 text-sm text-base-content/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-medium">Secure Login</span>
                    </div>
                    <p>Your data is protected with enterprise-grade security</p>
                </div>
            </div>
        </div>
    );
}