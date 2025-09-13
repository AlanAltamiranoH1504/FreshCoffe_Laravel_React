import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import type {FormRegistro} from "../../types";
import {useMutation} from "@tanstack/react-query";
import {registerUsuarioPOST} from "../../services/UsuarioService.ts";
import {toast} from "react-toastify";

const FormRegister = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormRegistro>();
    const navigate = useNavigate();
    function submitFormulario(data: FormRegistro) {
        registroUsuarioMutation.mutate(data);
    }

    const registroUsuarioMutation = useMutation({
        mutationKey: ["registroUsuario"],
        mutationFn: registerUsuarioPOST,
        onSuccess: () => {
            toast.success("Usuario registrado correctamente!");
            navigate("/auth/login");
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    })

    return (
        <>
            <form
                className="bg-gray-50 px-5 py-10 space-y-5 shadow rounded-lg border"
                onSubmit={handleSubmit(submitFormulario)}
            >
                <h2 className="text-center font-fjalla text-5xl mb-5 uppercase">Crea tu cuenta en <span
                    className="text-yellow-500 hover:text-yellow-600 transition-colors duration-500">Fresh Coffe</span>
                </h2>
                <div className="mt-5">
                    <label htmlFor="nombre" className="font-fjalla text-lg uppercase mb-2">Nombre:</label>
                    <input type="text" className="border p-2 rounded-lg w-full font-fjalla"
                           placeholder="Nombre de usuario"
                           {...register("name", {
                               required: "El nombre es obligatorio"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-fjalla rounded-md mt-1">
                        {errors.name && String(errors.name.message)}
                    </div>
                </div>
                <div>
                    <label htmlFor={"apellidos"} className="font-fjalla text-lg uppercase mb-2">Apellidos:</label>
                    <input type="text" className="border p-2 rounded-lg w-full font-fjalla"
                           placeholder="Apellidos de registro"
                           {...register("apellidos", {
                               required: "Los apellidos son obligatorios"
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-fjalla rounded-md mt-1">
                        {errors.apellidos && String(errors.apellidos.message)}
                    </div>
                </div>
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
                           placeholder="Minimo 6 caracteres"
                           {...register("password",  {
                               required: "El password es obligatorio",
                               minLength: {
                                   value: 6,
                                   message: "Debe tener al menos 6 caracteres"
                               }
                           })}
                    />
                    <div className="bg-red-100 text-red-600 text-center font-fjalla rounded-md mt-1">
                        {errors.password && String(errors.password.message)}
                    </div>
                </div>

                <div className="md:flex gap-5 justify-between font-fjalla text-gray-400">
                    <Link to="/auth/login">Iniciar Sesión</Link>
                    <Link to="/auth/olvide-password">¿Olvidaste tu password? Recuperala</Link>
                </div>

                <input type="submit" value="Crear Cuenta"
                       className="border p-2 w-full font-fjalla rounded-lg uppercase text-lg bg-amber-950 text-white hover:bg-amber-800 transition-colors duration-500 cursor-pointer"/>
            </form>
        </>
    );
}
export default FormRegister;