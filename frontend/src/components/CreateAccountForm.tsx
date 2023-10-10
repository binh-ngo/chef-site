import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../Accounts';

interface FormData {
    name: string;
    email: string;
    password: string;
}


function CreateAccountForm(props:any) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const { signIn, signUp } = useContext(AccountContext);

    let navigate = useNavigate();
    let from = props.from || "/";

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.password) {
            console.log('Form data submitted:', formData);
        } else {
            console.log('One of the fields are empty.')
        }
        try {
            // Sign up the user with username, email, and password
            const newUser = await signUp(formData.name, formData.email, formData.password);
            console.log("Account created.", newUser);
            // Now, log in the newly created user
            const loggedInNewUser = await signIn(formData.email, formData.password);
            console.log("Logged in.", loggedInNewUser);
            navigate(from, { replace: true });
          } catch (signupError) {
            console.error("Error creating account.", signupError);
          }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor='name' className="block text-gray-700 text-sm font-semibold mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='email' className="block text-gray-700 text-sm font-semibold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='password' className="block text-gray-700 text-sm font-semibold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                    >Submit</button>
            </form>
        </div>
    );
}

export default CreateAccountForm;
