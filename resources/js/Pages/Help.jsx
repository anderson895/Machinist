import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, useForm } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import PrimaryButton from "@/Components/PrimaryButton";

import toast from "react-hot-toast";

export default function Help() {
    const { auth, reports = [] } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        report: "",
    });

    const onSubmitReport = (e) => {
        e.preventDefault();

        post("/post-report", {
            onSuccess: () => {
                toast.success("Report posted!");
                reset();
            },
            onError: () => {
                toast.error("Something went wrong. Please try again.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Help Center
                </h2>
            }
        >
            <Head title="Help" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900">
                            Hello, {auth.user.name} 👋
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Need help or want to report something? Fill in the form below and our team will review your report promptly.
                        </p>
                    </div>

                    <form
                        onSubmit={onSubmitReport}
                        className="mt-8 bg-white p-6 rounded-lg shadow"
                    >
                        <div>
                            <TextAreaInput
                                id="report"
                                name="report"
                                className="mt-1 block w-full"
                                value={data.report}
                                onChange={(e) =>
                                    setData("report", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="report"
                                placeholder="Please write your report to be reviewed by our administrator."
                                style={{
                                    height: "40vh",
                                }}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.report}
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <PrimaryButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Post
                            </PrimaryButton>
                        </div>
                    </form>

                    {reports.length > 0 && (
                        <div className="mt-10">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                Your Previous Reports
                            </h4>
                            <div className="space-y-4">
                                {reports.map((r, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-gray-50 border rounded"
                                    >
                                        <p className="text-sm text-gray-800">
                                            {r.report}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Submitted on{" "}
                                            {new Date(
                                                r.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
