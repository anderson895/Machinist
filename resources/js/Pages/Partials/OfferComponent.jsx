import SecondaryButton from "@/Components/SecondaryButton";
import PostOfferForm from "./PostOfferForm";
import OffersComponent from "./OffersComponent";
import OrderOfferForm from "./OrderOfferForm";

import { usePage } from "@inertiajs/react";

export default function OfferComponent({
    offer,
    offeredByUser,
    canOrder,
}) {
    const user = usePage().props.auth.user;

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
        <>
            <div
                key={"offer-" + offer.id}
                className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
            >
                <div className="flex flex-col md:flex-row gap-6 p-6 text-gray-900">
                    <div className="w-full md:w-[50%]">
                        <div>
                            <div className="text-sm font-bold">
                                {offeredByUser.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(offer.created_at).toLocaleString()}
                            </div>
                        </div>

                        <div className="mt-5 text-sm">{offer.description}</div>

                        <div className="mt-5">
                            <div className="text-xs color-green-100">
                                Delivery Date:{" "}
                                {new Date(offer.delivery_time).toLocaleString()}
                            </div>
                            <div className="text-xs color-green-100">
                                Delivery Type : {offer.mod}
                            </div>
                            <div className="text-xs color-green-100">
                                Payment: {offer.mop}
                            </div>
                            <div className="text-xs color-green-100">
                                Price: {offer.price}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[40%]">
                        <div className="text-sm mb-2">Attached Files:</div>

                        {Object.entries(groupFilesByLabel(offer.files)).map(
                            ([label, files]) => (
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
                            )
                        )}
                    </div>
                </div>

                {user.id != offeredByUser.id && canOrder && (
                    <div className="pl-5 pb-5">
                        <OrderOfferForm offer={offer} />
                    </div>
                )}
            </div>
        </>
    );
}
