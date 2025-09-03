"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const {showNotification} = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setIsLoading(true);

        if(password!==confirmPassword){
            showNotification("Password do not match","error");
            setIsLoading(false);
            return;
        }
        try {
            const res = await fetch("/api/auth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password}),
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "Registration Failed");
            }
            showNotification("Registration successful! Please log in.","success");
            router.push("/login");
        } catch (error) {
            showNotification(
                error instanceof Error ?error.message:"Registration failed","error"
            )
        } finally {
            setIsLoading(false);
        }
    }

    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, text: "", color: "" };
        if (password.length < 6) return { strength: 25, text: "Weak", color: "text-error" };
        if (password.length < 8) return { strength: 50, text: "Fair", color: "text-warning" };
        if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return { strength: 100, text: "Strong", color: "text-success" };
        }
        return { strength: 75, text: "Good", color: "text-info" };
    };

    const passwordStrength = getPasswordStrength(password);
    const passwordsMatch = confirmPassword && password === confirmPassword;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-base-content mb-2">Create Account</h1>
                    <p className="text-base-content/60">Join our community and start sharing your videos</p>
                </div>

                {/* Registration Form */}
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
                                        placeholder="Create a strong password"
                                        className="input input-bordered input-lg w-full pr-12 focus:input-primary transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors"
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

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs text-base-content/60">Password strength</span>
                                            <span className={`text-xs font-medium ${passwordStrength.color}`}>
                                                {passwordStrength.text}
                                            </span>
                                        </div>
                                        <div className="w-full bg-base-200 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${
                                                    passwordStrength.strength >= 100 ? 'bg-success' :
                                                    passwordStrength.strength >= 75 ? 'bg-info' :
                                                    passwordStrength.strength >= 50 ? 'bg-warning' : 'bg-error'
                                                }`}
                                                style={{ width: `${passwordStrength.strength}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="confirmPassword">
                                    <span className="label-text font-medium">Confirm Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm your password"
                                        className={`input input-bordered input-lg w-full pr-12 transition-all duration-200 ${
                                            confirmPassword ? 
                                                (passwordsMatch ? 'input-success focus:input-success' : 'input-error focus:input-error') 
                                                : 'focus:input-primary'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors"
                                    >
                                        {showConfirmPassword ? (
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

                                {/* Password Match Indicator */}
                                {confirmPassword && (
                                    <label className="label">
                                        <span className={`label-text-alt flex items-center gap-1 ${
                                            passwordsMatch ? 'text-success' : 'text-error'
                                        }`}>
                                            {passwordsMatch ? (
                                                <>
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Passwords match
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    Passwords don't match
                                                </>
                                            )}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !email || !password || !confirmPassword || !passwordsMatch}
                                className="btn btn-primary btn-lg w-full transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                        Create Account
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider my-6">
                            <span className="text-base-content/40 text-sm">Already have an account?</span>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <Link 
                                href="/login" 
                                className="btn btn-ghost btn-lg w-full hover:bg-base-200 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Sign in to existing account
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-base-content/50">
                    <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
                </div>
            </div>
        </div>
    );
}