import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import ApproveUserForm from "./Partials/ApproveUserForm";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function ManageUserDetails() {
    const user = usePage().props.user;
    const files = usePage().props.files;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage User
                </h2>
            }
        >
            <Head title="Manage User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <header className="flex flex-wrap justify-between items-center mb-5">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">
                                    User Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Details about the user's account and contact
                                    information.
                                </p>
                            </div>

                            {!user.is_approved && (
                                <div className="mt-3 sm:mt-0">
                                    <ApproveUserForm user={user}>
                                        Click Here To Approve
                                    </ApproveUserForm>
                                </div>
                            )}
                        </header>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-[40%]">
                                <div className="mt-5">
                                    <InputLabel
                                        htmlFor="name"
                                        value={
                                            user.role == "manufacturer"
                                                ? "Company Name"
                                                : "Name"
                                        }
                                    />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={user.name}
                                        disabled
                                    />
                                </div>

                                <div className="mt-5">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        className="mt-1 block w-full"
                                        value={user.email}
                                        disabled
                                    />
                                </div>

                                {user.role == "manufacturer" && (
                                    <div className="mt-5">
                                        <InputLabel
                                            htmlFor="contact_person"
                                            value="Contact Person"
                                        />

                                        <TextInput
                                            id="contact_person"
                                            className="mt-1 block w-full"
                                            value={user.contact_person}
                                            disabled
                                        />
                                    </div>
                                )}

                                <div className="mt-5">
                                    <InputLabel
                                        htmlFor="contact_number"
                                        value="Contact no."
                                    />

                                    <TextInput
                                        id="contact_number"
                                        className="mt-1 block w-full"
                                        value={user.contact_number}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="w-full md:w-[60%] flex items-center justify-center">
                                <div>
                                    <InputLabel
                                        className="font-semibold text-lg"
                                        value="Valid Id:"
                                    />
                                    <img
                                        src={`/uploads/${files.find(file => file.label === 'Valid ID')?.file_name}`}
                                        alt="Valid Id"
                                        className="w-full md:max-w-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {user.role == "manufacturer" && (
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 mt-5">
                            <header className="flex flex-wrap justify-between items-center mb-5">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Uploaded Files
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Click to view the uploaded files
                                    </p>
                                </div>
                            </header>

                            <div className="flex flex-col md:flex-row gap-3 md:gap-10 mt-3">
                                <div>
                                    <a
                                        href={`/uploads/${files.find(file => file.label === 'Business Permit')?.file_name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-xl inline-block text-blue-600 hover:underline"
                                    >
                                        View Business Permit
                                    </a>
                                </div>

                                <div>
                                    <a
                                        href={`/uploads/${files.find(file => file.label === 'Company Profile')?.file_name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-xl inline-block text-blue-600 hover:underline"
                                    >
                                        Company Profile
                                    </a>
                                </div>

                                <div>
                                    <a
                                        href={`/uploads/${files.find(file => file.label === 'Location Map')?.file_name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-xl inline-block text-blue-600 hover:underline"
                                    >
                                        Location Map
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
