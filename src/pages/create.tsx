import { ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import Layout from 'components/page/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetcher, FetchError } from 'utils/fetcher';

function CreateFloorPlanPage() {
    const router = useRouter();
    const [ error, setError ] = useState<FetchError>(null);
    const { register, handleSubmit, formState } = useForm({});

    const submitHandler = handleSubmit(async (formData: FormData) => {
        setError(null);
        
        const res = await fetcher('/api/floor-plans', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        if (res.error) {
            setError(res.error);
        } else {
            router.push('/');
        }
    });

    const { errors } = formState;

    return (
        <Layout title="Generate a Floor Plan">
            <div>
                <div className="max-w-sm mt-4">
                    {error && (
                        <div className="p-4 border-l-4 border-red-400 bg-red-50">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">
                                {error.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <form onSubmit={submitHandler}>
                        <Input
                            label="Title"
                            type="text"
                            error={errors.title}
                            {...register('title', {
                                required: true,
                            })}
                        />

                        <Input
                            error={errors.width}
                            type="number"
                            label="Width (ft)"
                            {...register('width', {
                                required: true,
                                min: {
                                    value: 4,
                                    message: 'Width must be at least 4.',
                                }
                            })}
                        />

                        <Input
                            error={errors.length}
                            type="number"
                            label="Length (ft)"
                            {...register('length', {
                                required: true,
                                min: {
                                    value: 4,
                                    message: 'Length must be at least 4.',
                                }
                            })}
                        />

                        <Input
                            error={errors.maxRoomLength}
                            type="number"
                            label="Maximum length of a room (ft)"
                            {...register('maxRoomLength', {
                                required: true,
                            })}
                        />

                        <Input
                            error={errors.minRoomLength}
                            type="number"
                            label="Minimum length of a room (ft)"
                            {...register('minRoomLength', {
                                required: true,
                            })}
                        />

                        <Input
                            error={errors.maxDoors}
                            type="number"
                            label="Maximum number of doors in a room"
                            {...register('maxDoors', {
                                required: true,
                                min: {
                                    value: 1,
                                    message: 'Must be at least 1.'
                                }
                            })}
                        />

                        <div className="flex justify-end mt-4">
                            <Link href="/">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Generate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export interface InputProps {
    error?: { type: string, message: string };
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    onBlur: any;
    onChange: any;
}

const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(({
    error,
    label,
    name,
    placeholder,
    type,
    onBlur,
    onChange,
}, ref) => {
    const errorMessage = error?.type === 'required' ? 'This field is required.' : error?.message;

    return (
        <div className="mt-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative mt-1">
                <input
                    type={type}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    id={name}
                    ref={ref}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={placeholder}
                />
                {error && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ExclamationCircleIcon
                            className="w-5 h-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                    {errorMessage}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default CreateFloorPlanPage;
