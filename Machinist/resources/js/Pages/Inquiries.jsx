import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "./Partials/PostInquiryForm";

export default function Inquiries() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                user.role == "admin" ? (
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Inquiries
                    </h2>
                ) : (

                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Inquiries
                        </h2>
                        
                        <PostInquiryForm user={user} />
                    </div>
                )
            }
        >
            <Head title="Inquiries" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
