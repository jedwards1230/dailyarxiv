import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import React, { FunctionComponent, useState } from 'react';
import { Controller } from 'react-hook-form';
import useCategoryFormField from './useCategoryFormField';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import { Typography } from '@mui/joy';


interface Props {
    prefix?: string;
}

const CategoryFormField: FunctionComponent<Props> = ({ prefix = '' }) => {
    const {
        fields,
        watch,
        update,
        control,
        categoryArrayInputPath: categoryArrayInputPath,
    } = useCategoryFormField(prefix);

    const [open, setOpen] = useState(new Array(fields.length).fill(false));

    const handleClick = (i: number) => {
        const newOpen = [...open];
        newOpen[i] = !newOpen[i];
        setOpen(newOpen);
    };

    const checkIndeterminate = (index: number) => {
        // @ts-ignore: Unreachable code error
        const entry = watch(`${prefix}categories.${index}` as "categories") as ArchiveHeader;
        return (!entry.categories!.every((child) => child.checked) && !entry.categories!.every((child) => !child.checked))
    }

    const updateChildren = (index: number, checked: boolean) => {
        // @ts-ignore: Unreachable code error
        const entry = watch(`${prefix}categories.${index}` as "categories") as ArchiveHeader;
        entry.categories = entry.categories!.map((child) => {
            return {
                ...child,
                checked: checked
            }
        })
        update(index, entry);
    }

    return (
        <List sx={{ width: '100%' }}>
            {fields.map((header: ArchiveHeader, index) => {
                const hasChildren = header.categories && header.categories.length > 0;
                const fieldId = categoryArrayInputPath + `[${index}].checked` as 'checked';
                const indeterminate = hasChildren ? checkIndeterminate(index) : false;

                return (
                    <div key={header.id}>
                        <ListItem
                            sx={{ width: "100%" }}
                            startAction={
                                <Controller
                                    name={fieldId}
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            color="primary"
                                            variant="soft"
                                            checked={field.value}
                                            indeterminate={indeterminate}
                                            onChange={(e) => {
                                                if (hasChildren) updateChildren(index, e.target.checked)
                                                return field.onChange(e.target.checked)
                                            }}
                                        />
                                    )}
                                />
                            }
                            endAction={hasChildren &&
                                <div onClick={() => handleClick(index)}>
                                    {open[index]
                                        ? <IconButton
                                            variant="plain">
                                            <ExpandLess />
                                        </IconButton>
                                        : <IconButton
                                            variant="plain">
                                            <ExpandMore />
                                        </IconButton>
                                    }
                                </div>
                            }
                        >
                            <Typography
                                sx={{
                                    pl: 4,
                                    width: '90%',
                                    fontSize: { xs: '0.9rem', sm: '1rem'},
                                }}>{header.desc}</Typography>

                        </ListItem>
                        {(hasChildren && open[index]) &&
                            <ListItem nested sx={{ pl: 4 }} >
                                <CategoryFormField prefix={`${prefix}categories.${index}.`} />
                            </ListItem>
                        }
                    </div>
                )
            })}
        </List>
    );
};

export default CategoryFormField;