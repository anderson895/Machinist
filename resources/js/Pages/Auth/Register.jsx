import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import FileInput from "@/Components/FileInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        contact_no: "",
        valid_id: null,
        contact_person: "",
        business_permit: null,
        company_profile: null,
        location_map: null,
    });

    const roles = [
        { value: "", label: "" },
        { value: "user", label: "Buyer" },
        { value: "manufacturer", label: "Manufacturer" },
    ];

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="role" value="Role" />

                    <SelectInput
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full"
                        isFocused
                        options={roles}
                        onChange={(e) => setData("role", e.target.value)}
                        required
                    />

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value={data.role == "manufacturer" ? "Company Name" : "Name" } />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>


                {data.role == "manufacturer" && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="contact_person" value="Contact Person" />

                            <TextInput
                                id="contact_person"
                                name="contact_person"
                                value={data.contact_person}
                                className="mt-1 block w-full"
                                autoComplete="contact_person"
                                onChange={(e) => setData("contact_person", e.target.value)}
                                required
                            />

                            <InputError message={errors.contact_person} className="mt-2" />
                        </div>
                    </>
                )}


                <div className="mt-4">
                    <InputLabel htmlFor="contact_no" value="Contact no" />

                    <TextInput
                        id="contact_no"
                        name="contact_no"
                        value={data.contact_no}
                        className="mt-1 block w-full"
                        autoComplete="contact_no"
                        type="number"
                        onChange={(e) => setData("contact_no", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="valid_id" value="Valid ID (Image)" />

                    <FileInput
                        id="valid_id"
                        name="valid_id"
                        value={data.valid_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("valid_id", e.target.files[0])}
                        accept="image/png, image/jpeg"
                        required
                    />

                    <InputError message={errors.valid_id} className="mt-2" />
                </div>


                {data.role == "manufacturer" && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="business_permit" value="Business Permit (pdf)" />

                            <FileInput
                                id="business_permit"
                                name="business_permit"
                                value={data.business_permit}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("business_permit", e.target.files[0])}
                                accept="application/pdf"
                                required
                            />

                            <InputError message={errors.business_permit} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="company_profile" value="Company Profile (pdf)" />

                            <FileInput
                                id="company_profile"
                                name="company_profile"
                                value={data.company_profile}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("company_profile", e.target.files[0])}
                                accept="application/pdf"
                                required
                            />

                            <InputError message={errors.company_profile} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="location_map" value="Location Map (Image)" />

                            <FileInput
                                id="location_map"
                                name="location_map"
                                value={data.location_map}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("location_map", e.target.files[0])}
                                accept="image/png, image/jpeg"
                                required
                            />

                            <InputError message={errors.location_map} className="mt-2" />
                        </div>
                    </>
                )}


                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
