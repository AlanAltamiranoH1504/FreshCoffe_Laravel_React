import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormLogin} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {loginUsuarioPOST} from "../../services/UsuarioService.ts";
import {toast} from "react-toastify";

const FormLogin = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormLogin>();
    const navigate = useNavigate();

    function submitFormulario(data: FormLogin) {
        loginUsuarioMutation.mutate(data);
    }

    const loginUsuarioMutation = useMutation({
        mutationKey: ["loginUsuario"],
        mutationFn: loginUsuarioPOST,
        onSuccess: (data) => {
            navigate("/administracion");
            localStorage.setItem("token_sanctum_freshcoffe", data.token);
        },
        onError: (error) => {
            toast.error(error.response.data.error);
        }
    })

    return (
        <>
            <form
                onSubmit={handleSubmit(submitFormulario)}
                className="bg-gray-50 px-5 py-10 space-y-5 shadow rounded-lg border">
                <h2 className="text-center font-fjalla text-5xl mb-5 uppercase">Inicia Sesión en {" "}
                    <span className="text-yellow-500 hover:text-yellow-600 transition-colors duration-500 block">Fresh Coffe</span>
                </h2>
                <div>
                    <label htmlFor={"email"} className="font-fjalla text-lg uppercase mb-2">E-Mail:</label>
                    <input type="email" className="border p-2 rounded-lg w-full font-fjalla"
                           placeholder="E-Mail de registro"
                           {...register("email", {
                               required: "El e-mail es obligatorio",
                               pattern: {
                                   value: /\S+@\S+\.\S+/,
                                   message: "Formato de e-mail no valido"
                               }
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-fjalla rounded-md mt-1">
                        {errors.email && String(errors.email.message)}
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="font-fjalla text-lg uppercase mb-2">Password:</label>
                    <input type="password" className="border p-2 rounded-lg w-full font-fjalla"
                           placeholder="*****"
                           {...register("password", {
                               required: "El password es obligatorio",
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-fjalla rounded-md mt-1">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>
                <div className="md:flex gap-5 justify-between font-fjalla text-gray-400">
                    <Link to="/auth/registro">Registrarse</Link>
                    <Link to="/auth/olvide-password">¿Olvidaste tu password? Recuperala</Link>
                </div>

                <input type="submit" value="Iniciar Sesión"
                       className="border p-2 w-full font-fjalla rounded-lg uppercase text-lg bg-amber-950 text-white hover:bg-amber-800 transition-colors duration-500 cursor-pointer"/>
            </form>
        </>
    );
}
export default FormLogin;