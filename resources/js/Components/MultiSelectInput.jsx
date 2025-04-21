import { useEffect, useRef, forwardRef } from "react";
import Select from "react-select";

export default forwardRef(function MultiSelectInput(
    {
        className = "",
        isFocused = false,
        options = [],
        selectedOptions = [],
        onChange,
        ...props
    },
    ref
) {
    const localRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handleSelectChange = (selectedValues) => {
        const selectedValuesArray = selectedValues.map(
            (option) => option.value
        );
        onChange(selectedValuesArray);
    };

    return (
        <Select
            {...props}
            ref={localRef}
            className={
                "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full" +
                className
            }
            isMulti
            value={options.filter((option) =>
                selectedOptions.includes(option.value)
            )}
            onChange={handleSelectChange}
            options={options}
        />
    );
});
