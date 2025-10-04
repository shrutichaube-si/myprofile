import React, { use, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../Config.json'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [response, setResponse] = React.useState(null);
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(values);
            const data = await axios.post(config.apis.register, values)
            setResponse(data);
            if (response.status === 201) {
                navigate('/login');
            } else {
                console.log("something went wrong");
            }
        } catch (error) {
            if (error.response) {
                setResponse(error.response);
            } else {
                console.error(error);
                setResponse({ data: { message: 'Something went wrong. Please try again.' } });
            }
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={values.username}
                            onChange={e => setValues({ ...values, username: e.target.value })}
                            placeholder="Enter Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Email ID
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })}
                            placeholder="Enter Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {response && (
                        <p
                            className={`mt-3 text-center text-sm font-semibold ${response.status === 201 ? 'text-green-600' : 'text-red-500'
                                }`}
                        >
                            {response.data?.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
