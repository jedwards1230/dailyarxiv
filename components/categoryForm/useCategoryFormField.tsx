import { useFieldArray, useFormContext } from 'react-hook-form';

// redefine due to circular reference error in react-hook-form
type ArchiveHeader = {
    id: string,
    desc: string,
    code: string,
    checked: boolean,
    categories?: any[]
}

function useCategoryFormField(prefix: string) {
    const { control, register } = useFormContext<ArchiveHeader>();

    const categoryArrayInputPath = `${prefix}categories` as 'categories';

    const { fields } = useFieldArray({
        control,
        name: categoryArrayInputPath,
    });

    return {
        fields,
        register,
        control,
        categoryArrayInputPath: categoryArrayInputPath,
    };
}

export default useCategoryFormField;