import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import ApproveUserForm from "./Partials/ApproveUserForm";

export default function ManageUserDetails() {
    const user = usePage().props.user;

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
                        <div>
                            <header className="flex flex-wrap justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        User Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Details about the user's account and
                                        contact information.
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
