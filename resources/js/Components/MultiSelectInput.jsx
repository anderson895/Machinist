import { useEffect, useRef, forwardRef } from "react";
import Select from "react-select";

export default forwardRef(function MultiSelectInput(
    {
        className = "",
        isFocused = false,
        options = [],
        selectedOptions = [],
        onChange,
        selectAllLabel = "Select All",
        ...props
    },
    ref
) {
    const localRef = useRef(null);

    const SELECT_ALL = "*ALL*";
    const SELECT_ALL_OPTION = { label: selectAllLabel, value: SELECT_ALL };

    const allValues = options.map((opt) => opt.value);
    const isAllSelected =
        allValues.length > 0 &&
        selectedOptions.length === allValues.length &&
        allValues.every((v) => selectedOptions.includes(v));

    const mergedOptions = [SELECT_ALL_OPTION, ...options];

    const handleSelectChange = (selected) => {
        if (!selected || selected.length === 0) {
            onChange([]);
            return;
        }

        const values = selected.map((opt) => opt.value);

        const removedSelectAll = !values.includes(SELECT_ALL) && isAllSelected;
        const selectedSelectAll = values.includes(SELECT_ALL) && !isAllSelected;

        if (removedSelectAll) {
            onChange([]);
        } else if (selectedSelectAll) {
            onChange(allValues);
        } else {
            const filteredValues = values.filter((v) => v !== SELECT_ALL);
            onChange(filteredValues);
        }
    };

    const getCurrentSelected = () => {
        if (isAllSelected) {
            return [SELECT_ALL_OPTION, ...options];
        }

        return mergedOptions.filter((opt) => selectedOptions.includes(opt.value));
    };

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <Select
            {...props}
            ref={localRef}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            options={mergedOptions}
            value={getCurrentSelected()}
            onChange={handleSelectChange}
            className={
                "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full " +
                className
            }
        />
    );
});
