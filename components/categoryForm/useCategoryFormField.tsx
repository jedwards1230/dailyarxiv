import { useFieldArray, useFormContext } from 'react-hook-form';

// redefine due to circular reference error
type ArchiveHeader = {
    desc: string,
    code: string,
    checked: boolean,
    categories?: any[]
}

function useCategoryFormField(prefix: string) {
    const { control, register } = useFormContext<ArchiveHeader>();

    const checkedInputPath = `${prefix}checked` as 'checked';
    const categoryArrayInputPath = `${prefix}categories` as 'categories';

    const { fields } = useFieldArray({
        control,
        name: categoryArrayInputPath,
    });

    return {
        fields,
        register,
        control,
        checkedInputPath: checkedInputPath,
    };
}

export default useCategoryFormField;