import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";
import SelectInput from "@/Components/SelectInput";
import SecondaryButton from "@/Components/SecondaryButton";

export default function ManageUser() {
    const { users } = usePage().props;

    const [filter, setFilter] = useState("all");

    const filteredUsers = users.filter((user) => {
        if (filter == "approved") {
            return user.is_approved == true;
        } else if (filter == "pending") {
            return user.is_approved == false;
        }
        return true;
    });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manage User
                    </h2>

                    <div>
                        <SelectInput
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            options={[
                                { value: "all", label: "All Users" },
                                { value: "approved", label: "Approved" },
                                { value: "pending", label: "Pending" },
                            ]}
                        />
                    </div>
                </div>
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
                                    <th className="p-4">Status</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            {user.id}
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            {user.name}
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            {user.email}
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            {user.role == "user" ? "buyer" : user.role }
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            {user.is_approved ? (
                                                <span className="text-blue-500">
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="text-yellow-500">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50">
                                            <Link
                                                href={route(
                                                    "manage-user-details",
                                                    { id: user.id }
                                                )}
                                            >
                                                <SecondaryButton>
                                                    View Details
                                                </SecondaryButton>
                                            </Link>
                                        </td>
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
