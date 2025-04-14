import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

export default forwardRef(function FileInput(
    {
        className = "",
        value,
        onChange,
        required = false,
        ...props
    },
    ref
) {
    const localRef = useRef(null);
    const [fileName, setFileName] = useState(value ? value.name : "");

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (value && value.name !== fileName) {
            setFileName(value.name);
        }
    }, [value]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            onChange(e);
        }
    };

    return (
        <input
            type="file"
            {...props}
            ref={localRef}
            onChange={handleChange}
            className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${className}`}
            required={required}
        />
    );
});
