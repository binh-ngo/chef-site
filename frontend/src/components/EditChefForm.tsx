import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ddbCreateChef } from '../graphql/chefs';
import { Auth } from 'aws-amplify'

interface FormData {
    name: string;
    email: any;
    bio: string;
    location: string;
    tags: string;
    imageUrl: File | null;
    backgroundImageUrl: File | null;
}

function EditChefForm() {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        bio: '',
        location: '',
        tags: '',
        imageUrl: null,
        backgroundImageUrl: null,
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log(`Cognito username: ${user.username}`);
                setFormData((prevData) => ({
                    ...prevData,
                    email: user.username,
                }));
            } catch (error) {
                console.error('Error getting Cognito user:', error);
            }
        }
        fetchUserData();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const file = e.target.files ? e.target.files[0] : null;
        console.log(fieldName)
        console.log(file!.name)
        console.log(`PROFILE ${formData.imageUrl}`)
        console.log(`BACKGROUND ${formData.backgroundImageUrl}`)
        if (file) {
            setFormData({ ...formData, [fieldName]: file });
        } else {
            setFormData({ ...formData, [fieldName]: null });
        }
    };
    
    function stringofTags(inputString: string): string[] {
        const cleanedString = inputString.replace(/,/g, ' '); // Replace commas with spaces
        const tagsArray = cleanedString.split(/\s+/); // Split by spaces

        return removeDuplicates(tagsArray);
    }
    function removeDuplicates(arr: string[]) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.name) {
            console.log('Form data submitted:', formData);

            const chef = {
                name: formData.name,
                bio: formData.bio,
                location: formData.location,
                tags: formData.tags.trim() ? stringofTags(formData.tags) : [],
                email: formData.email,
                imageUrl: formData.imageUrl || undefined,
                backgroundImageUrl: formData.backgroundImageUrl || undefined,
            }

            let createdChef = null;
            const response = await ddbCreateChef(chef);
            if ('data' in response) {
                // Handle the case when response is a GraphQL result
                createdChef = response.data.createChef;
                console.log(`Response from DynamoDB: ${JSON.stringify(createdChef)}`);
            } else {
                console.error('Response is not a GraphQL result:', response);
            } if (createdChef) {
                console.log("Chef successfully created")
            } else {
                console.log("onSave called but title or children are empty");
            }
        }
        else {
            console.log("onSave called but title or children are empty");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
            <form encType='multipart/form-data' onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor='name' className="block text-gray-700 text-sm font-semibold mb-2">
                        Name:
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
                    <label htmlFor='bio' className="block text-gray-700 text-sm font-semibold mb-2">
                        Bio:
                    </label>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='location' className="block text-gray-700 text-sm font-semibold mb-2">
                        Location:
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='tags' className="block text-gray-700 text-sm font-semibold mb-2">
                        Tags:
                    </label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-semibold mb-2">
        Profile Picture:
    </label>
    <input
        type="file"
        accept="image/*"
        name="imageUrl"
        onChange={handleImageChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
    {formData.imageUrl !== null ? (
        <p>Selected Image: {(formData.imageUrl as unknown as File).name}</p>
    ) : (
        <p>No Image Selected</p>
    )}
</div>
<div className="mb-4">
    <label htmlFor="backgroundImageUrl" className="block text-gray-700 text-sm font-semibold mb-2">
        Background Image:
    </label>
    <input
        type="file"
        accept="image/*"
        name="backgroundImageUrl"
        onChange={handleImageChange}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
    {formData.backgroundImageUrl !== null ? (
        <p>Selected Image: {(formData.backgroundImageUrl as unknown as File).name}</p>
    ) : (
        <p>No Image Selected</p>
    )}
</div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
                >Submit</button>
            </form>
        </div>
    );
}

export default EditChefForm;
