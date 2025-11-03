import ListingButton from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg bg-white border border-gray-200">
        <h1 className="font-sans text-3xl font-semibold text-center text-gray-800">
         Giriş yap
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Hoş geldin
        </p>

        <div className="pt-8">
          <form className="flex flex-col gap-6">
            {/* Email */}
            <div className="relative">
              <input
                type={"email"}
                placeholder=" "
                className="peer border-2 border-gray-200 rounded-lg outline-none w-full py-2 px-2 transition-all duration-300 bg-white focus:bg-white  "
                autoComplete="off"
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
                autoComplete="off"
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

            {/* Login Link */}
            <div className="text-center text-gray-500 text-sm">
              Hesabın yok mu?{" "}
              <Link href={"/signup"} className="underline text-blue-500 hover:text-blue-600">
                Kayıt ol
              </Link>
            </div>

            {/* Button */}
            <ListingButton label="Kayıt Ol"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
