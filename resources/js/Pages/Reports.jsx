import { FaArrowRight } from "react-icons/fa";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";

export default function Reports() {
    var props = usePage().props;
    var reports = props.reports;

    console.log(props);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Reports
                </h2>
            }
        >
            <Head title="Reports" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {reports.map((report) => (
                        <div
                            key={`report-${report.id}`}
                            className="overflow-hidden bg-white shadow-sm sm:rounded-sm p-3 mt-1"
                        >
                            <div className="text-xs">
                                {new Date(report.created_at).toLocaleString()}
                            </div>
                            <hr className="my-3" />
                            <div className="text-sm">{report.report}</div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
