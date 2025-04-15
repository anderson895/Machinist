import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import PostInquiryForm from "./Partials/PostInquiryForm";

export default function Inquiries() {
    const user = usePage().props.auth.user;
    const inquiries = usePage().props.inquiries;

    const groupFilesByLabel = (files) => {
        return files.reduce((acc, file) => {
            if (!acc[file.label]) {
                acc[file.label] = [];
            }
            acc[file.label].push(file);
            return acc;
        }, {});
    };

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
                    {inquiries.map((inquiry) => (
                        <div
                            key={"inquiries-" + inquiry.id}
                            className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        >
                            <div className="flex flex-col md:flex-row gap-6 p-6 text-gray-900">
                                <div className="w-full md:w-[50%]">
                                    <div>
                                        <div className="text-lg font-bold">
                                            {inquiry.user.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(
                                                inquiry.created_at
                                            ).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="mt-5 text-sm">
                                        {inquiry.description}
                                    </div>

                                    <div className="mt-5">
                                        <div className="text-xs color-green-100">
                                            Delivery Date:{" "}
                                            {new Date(
                                                inquiry.delivery_time
                                            ).toLocaleString()}
                                        </div>
                                        <div className="text-xs color-green-100">
                                            Delivery Type : {inquiry.mod}
                                        </div>
                                        <div className="text-xs color-green-100">
                                            Payment: {inquiry.mop}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-[40%]">
                                    <div className="text-sm mb-2">Attached Files:</div>

                                    {Object.entries(
                                        groupFilesByLabel(inquiry.files)
                                    ).map(([label, files]) => (
                                        <div key={label} className="mb-3">
                                            <div className="text-xs font-bold m-0">
                                                {label.toUpperCase()}:
                                            </div>
                                            <ul>
                                                {files.map((file) => (
                                                    <div key={`file-${file.id}`}>
                                                        <a
                                                            href={`/uploads/${file.file_name}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="m-0 mb-1 text-xs inline-block text-blue-600 hover:underline"
                                                        >
                                                            {file.file_name}
                                                        </a>
                                                    </div>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    <div></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
