"use client"
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { AuthInput, AuthSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ListingButton from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthInput>({
    resolver: zodResolver(AuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter()

  const onSubmit = async (data: AuthInput) => {
    try {
      await axiosInstance.post("/api/auth/signup", data);
      toast.success("Kayıt başarılı giriş sayfasına yönlendirileceksiniz.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Bir hata oluştu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
        <h1 className="font-sans text-3xl font-semibold text-center text-gray-800">
          Kayıt Ol
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Hesabınızı oluşturun ve hemen başlayın
        </p>

        <div className="pt-8">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div className="relative">
              <input
                type={"email"}
                placeholder=" "
                className="peer border-2 border-gray-200 rounded-lg outline-none w-full py-2 px-2 transition-all duration-300 bg-white focus:bg-white  "
                autoComplete="email"
                {...register("email")}
              />
              <label
                htmlFor={"email"}
                className="absolute left-4 -top-2.5 text-sm text-black bg-white px-2 transition-all duration-200 pointer-events-none 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={"password"}
                placeholder=" "
                className="peer border-2 border-gray-200 rounded-lg outline-none w-full py-2 px-2 transition-all duration-300 bg-white focus:bg-white  "
                autoComplete="password"
                {...register("password")}
              />
              <label
                htmlFor={"password"}
                className="absolute left-4 -top-2.5 text-sm text-black bg-white px-2 transition-all duration-200 pointer-events-none 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base 
                  peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
                  peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-black peer-focus:bg-white"
              >
                Parola
              </label>
            </div>

            {/* Signup Link */}
            <div className="text-center text-gray-500 text-sm">
              Hesabın var mı?{" "}
              <Link
                href={"/login"}
                className="underline text-blue-500 hover:text-blue-600"
              >
                Giriş Yap
              </Link>
            </div>

            {/* Button */}
            <ListingButton variant="success" label="Kayıt Ol" type="submit"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
