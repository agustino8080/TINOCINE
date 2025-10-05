import React, { useState } from 'react';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [generalError, setGeneralError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        let newErrors = { email: '', password: '' };
        let isValid = true;

        // Validar email
        if (!email) {
            newErrors.email = 'Por favor, ingresa tu correo electrónico.';
            isValid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Ingresa un correo electrónico válido.';
            isValid = false;
        }

        // Validar contraseña
        if (!password) {
            newErrors.password = 'Por favor, ingresa tu contraseña.';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            // Lógica de autenticación con base de datos
            console.log('Login attempt:', { email, password });
            
            // Simulación de error de credenciales, quitar esto cuando conectes la BD
            setGeneralError('Credenciales incorrectas. Verifica tu email y contraseña.');
            
            // Cuando se conecte con bases de datos
            // authenticateUser(email, password)
            //   .then(response => {
            //     // Redirigir al usuario
            //   })
            //   .catch(error => {
            //     setGeneralError('Credenciales incorrectas.');
            //   });
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors({ ...errors, email: '' });
        }
        if (generalError) {
            setGeneralError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors({ ...errors, password: '' });
        }
        if (generalError) {
            setGeneralError('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
                
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">
                        CINEWATCH
                    </h1>
                    <span className="text-xs text-gray-400">™</span>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
                    Ingresa con tu cuenta CINEWATCH
                </h2>

                {/* Mensaje de error general */}
                {generalError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-600">{generalError}</span>
                    </div>
                )}

                <div className="space-y-6">
                    
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                errors.email 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                            }`}
                            placeholder=""
                        />
                        {errors.email && (
                            <div className="mt-2 flex items-start gap-2">
                                <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0 text-sm" />
                                <span className="text-sm text-red-600">{errors.email}</span>
                            </div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                                errors.password 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'
                            }`}
                            placeholder=""
                        />
                        {errors.password && (
                            <div className="mt-2 flex items-start gap-2">
                                <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0 text-sm" />
                                <span className="text-sm text-red-600">{errors.password}</span>
                            </div>
                        )}
                    </div>

                    <div className="text-left">
                        <a 
                            href="#" 
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                            Olvidé mi contraseña
                        </a>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 uppercase tracking-wide"
                    >
                        Entrar
                    </button>

                    <button
                        type="button"
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 transition-colors duration-200 uppercase tracking-wide"
                    >
                        Registrarse
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-500">
                    Al iniciar sesión, aceptas nuestros{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                        Términos y Condiciones
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;