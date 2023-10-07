import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Auth } from 'aws-amplify'
import { ddbCreatePost, ddbGetPostById } from '../graphql/posts';
import { useNavigate } from 'react-router-dom';
import { ddbGetAllChefs } from '../graphql/chefs';

interface FormData {
    postAuthor: string;
    body: string;
    tags: string;
    imageUrl: File | null;
}

function CreatePostForm() {

    const [formData, setFormData] = useState<FormData>({
        postAuthor: '',
        body: '',
        tags: '',
        imageUrl: null,
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                console.log(`Cognito username: ${user.username}`);
                setFormData((prevData) => ({
                    ...prevData,
                    postAuthor: user.username,
                }));
            } catch (error) {
                console.error('Error getting Cognito user:', error);
            }
        }
        fetchUserData();
    }, []);

    let navigate = useNavigate();

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
        if (file) {
            setFormData({ ...formData, [fieldName]: file });
            console.log(`IMAGE ${formData.imageUrl}`)
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
        if (formData.body && formData.postAuthor.trim() !== '') {
            console.log('Form data submitted:', formData);
            const getChefId = await ddbGetAllChefs();
            let authorId = '';
            for(let i = 0; i < getChefId.length; i++) {
                if (formData.postAuthor === getChefId[i].name) {
                    authorId = getChefId[i].chefId;
                    break;
                } 
            }
            const post = {
                postAuthor: formData.postAuthor,
                authorId: authorId,
                body: formData.body,
                tags: formData.tags.trim() ? stringofTags(formData.tags) : [],
                imageUrl: formData.imageUrl || undefined,
            }

            let createdPost = null;
            const response = await ddbCreatePost(post);
            if ('data' in response) {
                // Handle the case when response is a GraphQL result
                createdPost = response.data.createPost;
                console.log(`Response from DynamoDB: ${JSON.stringify(createdPost)}`);
            } else {
                console.error('Response is not a GraphQL result:', response);
            } if (createdPost) {
                console.log("Chef successfully created")
                const getPost = await ddbGetPostById(createdPost.postAuthor, createdPost.postId);
                const uploadUrl = getPost.imageUrl;
                console.log(`S3 URL ~~~~~~~~${uploadUrl}`);
                await fetch(uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData.imageUrl
                })
                navigate('/home');
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
                    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-semibold mb-2">
                        Image:
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
                    <label htmlFor='body' className="block text-gray-700 text-sm font-semibold mb-2">
                        Body:
                    </label>
                    <input
                        type="text"
                        name="body"
                        value={formData.body}
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

export default CreatePostForm;
