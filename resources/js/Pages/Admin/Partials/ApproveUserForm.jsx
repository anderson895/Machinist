import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm, router } from "@inertiajs/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ApproveUserForm({ user, className = "" }) {
    const [confirmingUserApproval, setConfimingUserApproval] = useState(false);

    const confirmUserApproval = () => {
        setConfimingUserApproval(true);
    };

    const approveUser = (e) => {
        e.preventDefault();

        router.post(
            "/approve-user",
            { id: user.id },
            {
                onSuccess: () => {
                    setConfimingUserApproval(false);
                    toast.success('User approved successfully!');
                },
                onError: () => {
                    toast.error('Something went wrong. Please try again.');
                },
            }
        );
    };

    const closeModal = () => {
        setConfimingUserApproval(false);
    };

    return (
        <>
            <PrimaryButton onClick={confirmUserApproval}>
                Click Here To Approve
            </PrimaryButton>

            <Modal show={confirmingUserApproval}>
                <form onSubmit={approveUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to approve this user account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        By approving this user account, you are granting them
                        access to the system based on their assigned role.
                        Please confirm that you want to proceed with this
                        action.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3">Approve</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
