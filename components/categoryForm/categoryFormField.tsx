import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, Checkbox, ListItemText, Collapse, List, ListItem } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { Controller } from 'react-hook-form';
import useCategoryFormField from './useCategoryFormField';

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
        <List
            disablePadding
            sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {fields.map((header: ArchiveHeader, index) => {
                const hasChildren = header.categories && header.categories.length > 0;
                const fieldId = categoryArrayInputPath + `[${index}].checked` as 'checked';
                const indeterminate = hasChildren ? checkIndeterminate(index) : false;

                return (
                    <div key={header.id}>
                        <ListItemButton>
                            <Controller
                                name={fieldId}
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        edge="start"
                                        onChange={(e) => {
                                            if (hasChildren) updateChildren(index, e.target.checked)
                                            return field.onChange(e.target.checked)
                                        }}
                                        checked={indeterminate || field.value}
                                        indeterminate={indeterminate}
                                    />
                                )}
                            />
                            <ListItemText primary={header.desc} />
                            {hasChildren &&
                                <div onClick={() => handleClick(index)}>
                                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                                </div>
                            }
                        </ListItemButton>
                        {hasChildren &&
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List
                                    disablePadding
                                    sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    <ListItem sx={{ pl: 4 }}>
                                        <CategoryFormField prefix={`${prefix}categories.${index}.`} />
                                    </ListItem>
                                </List>
                            </Collapse>
                        }
                    </div>
                )
            })}
        </List>
    );
};

export default CategoryFormField;