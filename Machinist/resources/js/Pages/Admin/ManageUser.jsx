import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

export default function ManageUser() {
    const { users } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage User
                </h2>
            }
        >
            <Head title="Manage User" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="relative flex flex-col overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border max-h-[75vh]">
                        <table className="text-left table-auto">
                            <thead className="sticky top-0 bg-white border-b-2 border-blue-gray-50">
                                <tr>
                                    <th className="p-4">#</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-4 border-b border-blue-gray-50">{user.id}</td>
                                        <td className="p-4 border-b border-blue-gray-50">{user.name}</td>
                                        <td className="p-4 border-b border-blue-gray-50">{user.email}</td>
                                        <td className="p-4 border-b border-blue-gray-50">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
